/**
 * Request coalescing and short-lived response cache for backend API reads.
 *
 * Why this exists
 * ---------------
 * The data layer is consumed from three places that each fire the *same* GET:
 *
 *   - `generateMetadata()` and the page body during one server render
 *   - a `useEffect` that React 18 StrictMode deliberately invokes twice in dev
 *   - several client components that mount together on the same route
 *
 * Without coordination each of those becomes a real request to Laravel. The
 * result is a page load that costs a dozen backend calls instead of one.
 *
 * This module fixes that in two independent ways:
 *
 *   1. **In-flight coalescing** — concurrent identical GETs share one promise,
 *      so N simultaneous callers cause exactly one network request. This is the
 *      important one: it works even when the response has no cached value yet.
 *   2. **TTL response cache** — a resolved response is replayed for a short
 *      window, so sequential calls and client-side navigations do not re-hit
 *      the network.
 *
 * Failures are deliberately never cached. A cached `null` from a 2.5s timeout
 * would pin the whole page to fallback content for the rest of the window.
 *
 * Only idempotent methods are cached or coalesced. POST/PUT/PATCH/DELETE always
 * reach the network so an admin save is never silently dropped.
 */

type ResponseEntry = {
  expiresAt: number;
  response: Response;
};

const inflight = new Map<string, Promise<Response | null>>();
const responses = new Map<string, ResponseEntry>();

/** Event dispatched when a saved mutation invalidates cached reads. */
export const API_CACHE_INVALIDATED_EVENT = 'fh_api_cache_invalidated';

/**
 * Cache windows per API path, in milliseconds.
 *
 * These mirror the Laravel `Cache-Control` policy so the browser, any CDN, the
 * Next.js data cache and this layer all expire in roughly the same window.
 * Matching the windows matters: a shorter client window than the server window
 * buys nothing but extra requests.
 */
const TTL_BY_PATH: Array<[RegExp, number]> = [
  [/\/plots(\/|$|\?)/, 30_000],
  [/\/settings(\/|$|\?)/, 60_000],
  [/\/seo(\/|$|\?)/, 120_000],
  [/\/blocks(\/|$|\?)/, 120_000],
  [/\/gallery(\/|$|\?)/, 120_000],
  [/\/blogs(\/|$|\?)/, 120_000],
  [/\/redirects(\/|$|\?)/, 120_000],
  [/\/sitemap-routes/, 600_000],
];

export const DEFAULT_TTL_MS = 30_000;

/**
 * Anti-cache query parameters the data layer appends to force freshness. A URL
 * carrying one of these must always reach the network, otherwise the appended
 * timestamp would be pointless.
 */
const BYPASS_PARAMS = ['_t='];

export function ttlForUrl(url: string): number {
  for (const param of BYPASS_PARAMS) {
    if (url.includes(param)) {
      return 0;
    }
  }

  // Strip the API base so the patterns below match only the resource path.
  const path = url.replace(/^https?:\/\/[^/]+/i, '');

  for (const [pattern, ttl] of TTL_BY_PATH) {
    if (pattern.test(path)) {
      return ttl;
    }
  }

  return DEFAULT_TTL_MS;
}

function isCoalescable(init?: RequestInit): boolean {
  const method = (init?.method ?? 'GET').toUpperCase();

  if (method !== 'GET' && method !== 'HEAD') {
    return false;
  }

  if (init?.cache === 'no-store' || init?.cache === 'reload') {
    return false;
  }

  return true;
}

/**
 * Run `factory` under a shared cache entry.
 *
 * Returns a cloned response per caller, because a `Response` body can only be
 * consumed once and every caller expects to read it independently.
 */
export function coalescedFetch(
  url: string,
  factory: () => Promise<Response | null>,
  ttlMs?: number,
  init?: RequestInit,
): Promise<Response | null> {
  // A caller that explicitly asked for no-store must not be served from, or
  // contribute to, the in-process cache.
  if (!isCoalescable(init)) {
    return factory();
  }

  const ttl = ttlMs ?? ttlForUrl(url);

  if (ttl > 0) {
    const entry = responses.get(url);

    if (entry && entry.expiresAt > Date.now()) {
      return Promise.resolve(entry.response.clone());
    }

    if (entry) {
      responses.delete(url);
    }
  }

  const pending = inflight.get(url);

  if (pending) {
    return pending.then((res) => (res ? res.clone() : null));
  }

  const request = factory()
    .then((res) => {
      // Only successful reads are worth replaying.
      if (res && res.ok && ttl > 0) {
        responses.set(url, { expiresAt: Date.now() + ttl, response: res.clone() });
      }

      return res;
    })
    .finally(() => {
      inflight.delete(url);
    });

  inflight.set(url, request);

  return request.then((res) => (res ? res.clone() : null));
}

/**
 * Drop cached responses. With no arguments the whole cache is cleared.
 *
 * Called after an authenticated write so the next read observes the change
 * without waiting out the TTL.
 */
export function invalidateApiCache(prefix?: string): void {
  if (prefix) {
    for (const key of Array.from(responses.keys())) {
      if (key.includes(prefix)) {
        responses.delete(key);
      }
    }
  } else {
    responses.clear();
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(API_CACHE_INVALIDATED_EVENT, { detail: { prefix: prefix ?? null } }));
  }
}

/**
 * Invalidate every cached read belonging to a resource family. Used after an
 * admin mutation, e.g. saving plot data clears `/plots` reads.
 */
export function invalidateApiResource(...segments: string[]): void {
  const path = segments.join('/');

  invalidateApiCache(path);
}

/** Test seam: drop all in-flight and cached state. */
export function resetApiCacheForTests(): void {
  inflight.clear();
  responses.clear();
}

/**
 * Derive the resource family a URL belongs to, e.g.
 * `http://host/api/settings/homepage_cms` -> `/settings`.
 */
export function resourceOf(url: string): string {
  const path = url.replace(/^https?:\/\/[^/]+/i, '').split('?')[0];
  const match = path.match(/\/api\/([^/]+)/);

  return match ? `/${match[1]}` : '';
}

/**
 * Invalidate every cached read for the resource family a write touched.
 *
 * Called after a successful mutation so an admin save is visible immediately
 * rather than after the TTL. Only public read families are affected; auth and
 * lead endpoints have no cached reads.
 */
export function invalidateForWrite(url: string): void {
  const resource = resourceOf(url);

  if (resource === '' || AUTHENTICATED_RESOURCES.has(resource)) {
    return;
  }

  invalidateApiCache(resource);
}

const AUTHENTICATED_RESOURCES = new Set(['/auth', '/admin', '/leads']);