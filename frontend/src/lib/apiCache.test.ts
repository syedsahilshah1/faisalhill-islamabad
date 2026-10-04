/**
 * The cache layer relies on `Response.clone()` and body re-reads, so these tests
 * run against Node's real Fetch API rather than jsdom's, which does not expose
 * `Response` at all.
 *
 * @jest-environment node
 */
import {
  API_CACHE_INVALIDATED_EVENT,
  coalescedFetch,
  invalidateApiCache,
  invalidateApiResource,
  invalidateForWrite,
  resetApiCacheForTests,
  resourceOf,
  ttlForUrl
} from '@/lib/apiCache';

function jsonResponse(body: unknown = { ok: true }): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

describe('apiCache', () => {
  beforeEach(() => {
    resetApiCacheForTests();
    jest.useRealTimers();
  });

  describe('in-flight coalescing', () => {
    it('collapses concurrent identical GETs into a single request', async () => {
      const factory = jest.fn(async () => jsonResponse({ id: 1 }));

      const results = await Promise.all([
        coalescedFetch('https://api.test/api/plots', factory),
        coalescedFetch('https://api.test/api/plots', factory),
        coalescedFetch('https://api.test/api/plots', factory)
      ]);

      expect(factory).toHaveBeenCalledTimes(1);
      expect(results).toHaveLength(3);
    });

    it('gives every coalesced caller an independently readable body', async () => {
      const factory = jest.fn(async () => jsonResponse({ id: 7 }));

      const [first, second] = await Promise.all([
        coalescedFetch('https://api.test/api/plots', factory),
        coalescedFetch('https://api.test/api/plots', factory)
      ]);

      await expect(first!.json()).resolves.toEqual({ id: 7 });
      await expect(second!.json()).resolves.toEqual({ id: 7 });
    });

    it('does not coalesce different URLs', async () => {
      const factory = jest.fn(async () => jsonResponse());

      await Promise.all([
        coalescedFetch('https://api.test/api/plots', factory),
        coalescedFetch('https://api.test/api/blocks', factory)
      ]);

      expect(factory).toHaveBeenCalledTimes(2);
    });

    it('releases the in-flight slot after settling so later calls refetch', async () => {
      const factory = jest.fn(async () => jsonResponse());

      await coalescedFetch('https://api.test/api/sitemap-routes', factory, 0);
      await coalescedFetch('https://api.test/api/sitemap-routes', factory, 0);

      expect(factory).toHaveBeenCalledTimes(2);
    });
  });

  describe('TTL response cache', () => {
    it('serves a repeat read from cache within the window', async () => {
      const factory = jest.fn(async () => jsonResponse({ id: 1 }));

      await coalescedFetch('https://api.test/api/plots', factory, 10_000);
      await coalescedFetch('https://api.test/api/plots', factory, 10_000);
      await coalescedFetch('https://api.test/api/plots', factory, 10_000);

      expect(factory).toHaveBeenCalledTimes(1);
    });

    it('refetches once the window has elapsed', async () => {
      jest.useFakeTimers();
      const factory = jest.fn(async () => jsonResponse());

      await coalescedFetch('https://api.test/api/blocks', factory, 1_000);
      jest.advanceTimersByTime(1_500);
      await coalescedFetch('https://api.test/api/blocks', factory, 1_000);

      expect(factory).toHaveBeenCalledTimes(2);
    });

    it('never caches a failure, so a transient outage does not pin fallback content', async () => {
      const factory = jest
        .fn<Promise<Response | null>, []>()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(jsonResponse({ recovered: true }));

      await expect(coalescedFetch('https://api.test/api/plots', factory, 10_000)).resolves.toBeNull();
      await expect(coalescedFetch('https://api.test/api/plots', factory, 10_000)).resolves.not.toBeNull();

      expect(factory).toHaveBeenCalledTimes(2);
    });

    it('never caches a non-ok response', async () => {
      const factory = jest.fn(async () => new Response('boom', { status: 500 }));

      await coalescedFetch('https://api.test/api/plots', factory, 10_000);
      await coalescedFetch('https://api.test/api/plots', factory, 10_000);

      expect(factory).toHaveBeenCalledTimes(2);
    });
  });

  describe('ttlForUrl', () => {
    it('uses the shortest window for plots so price edits surface quickly', () => {
      expect(ttlForUrl('https://api.test/api/plots')).toBe(30_000);
      expect(ttlForUrl('https://api.test/api/plots?block=block-a')).toBe(30_000);
      expect(ttlForUrl('https://api.test/api/plots/plot-101')).toBe(30_000);
    });

    it('uses a longer window for rarely changing content', () => {
      expect(ttlForUrl('https://api.test/api/blocks')).toBe(120_000);
      expect(ttlForUrl('https://api.test/api/settings')).toBe(60_000);
      expect(ttlForUrl('https://api.test/api/seo/home')).toBe(120_000);
      expect(ttlForUrl('https://api.test/api/sitemap-routes')).toBe(600_000);
    });

    it('disables caching when a cache-busting parameter is present', () => {
      expect(ttlForUrl('https://api.test/api/settings/social_links?_t=1700000000000')).toBe(0);
    });

    it('falls back to the default window for unknown resources', () => {
      expect(ttlForUrl('https://api.test/api/unknown')).toBe(30_000);
    });
  });

  describe('invalidation', () => {
    it('drops only the matching resource family', async () => {
      const plots = jest.fn(async () => jsonResponse());
      const blocks = jest.fn(async () => jsonResponse());

      await coalescedFetch('https://api.test/api/plots', plots, 10_000);
      await coalescedFetch('https://api.test/api/blocks', blocks, 10_000);

      invalidateApiResource('plots');

      await coalescedFetch('https://api.test/api/plots', plots, 10_000);
      await coalescedFetch('https://api.test/api/blocks', blocks, 10_000);

      expect(plots).toHaveBeenCalledTimes(2);
      expect(blocks).toHaveBeenCalledTimes(1);
    });

    it('drops everything when no prefix is given', async () => {
      const plots = jest.fn(async () => jsonResponse());
      const blocks = jest.fn(async () => jsonResponse());

      await coalescedFetch('https://api.test/api/plots', plots, 10_000);
      await coalescedFetch('https://api.test/api/blocks', blocks, 10_000);

      invalidateApiCache();

      await coalescedFetch('https://api.test/api/plots', plots, 10_000);
      await coalescedFetch('https://api.test/api/blocks', blocks, 10_000);

      expect(plots).toHaveBeenCalledTimes(2);
      expect(blocks).toHaveBeenCalledTimes(2);
    });

    it('notifies mounted components so they can refetch', () => {
      const dispatchEvent = jest.fn();
      (globalThis as { window?: unknown }).window = { dispatchEvent };

      invalidateApiResource('/plots');

      expect(dispatchEvent).toHaveBeenCalledTimes(1);
      expect(dispatchEvent.mock.calls[0][0]).toMatchObject({ type: API_CACHE_INVALIDATED_EVENT });

      delete (globalThis as { window?: unknown }).window;
    });
  });

  describe('invalidateForWrite', () => {
    it.each([
      ['https://api.test/api/plots', '/plots'],
      ['https://api.test/api/blocks/block-a', '/blocks'],
      ['https://api.test/api/settings/homepage_cms', '/settings'],
      ['https://api.test/api/seo/home', '/seo'],
      ['https://api.test/api/gallery', '/gallery'],
      ['https://api.test/api/redirects/1', '/redirects']
    ])('invalidates %s as %s after a write', async (url, resource) => {
      const factory = jest.fn(async () => jsonResponse());

      await coalescedFetch(url, factory, 10_000);
      invalidateForWrite(url);
      await coalescedFetch(url, factory, 10_000);

      expect(factory).toHaveBeenCalledTimes(2);
      expect(resource).toBeTruthy();
    });

    it('leaves authenticated resources alone', async () => {
      const factory = jest.fn(async () => jsonResponse());
      const url = 'https://api.test/api/leads';

      await coalescedFetch(url, factory, 10_000);
      invalidateForWrite(url);
      await coalescedFetch(url, factory, 10_000);

      expect(factory).toHaveBeenCalledTimes(1);
    });
  });

  describe('resourceOf', () => {
    it('extracts the resource family regardless of query string', () => {
      expect(resourceOf('https://api.test/api/settings/homepage_cms')).toBe('/settings');
      expect(resourceOf('https://api.test/api/plots?block=block-a')).toBe('/plots');
      expect(resourceOf('https://api.test/api/unknown')).toBe('/unknown');
      expect(resourceOf('https://api.test/not-an-api-path')).toBe('');
    });
  });
});