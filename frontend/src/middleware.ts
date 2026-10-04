import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type RedirectRule = { source_url: string; destination_url: string; status_code: number };

// Redirect rules are looked up on every single request, so they are held as a
// keyed map rather than an array scanned per request.
let redirectMap: Map<string, RedirectRule> | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * `redirectMap === null` means "not loaded yet". A separate loaded flag is not
 * needed, but an *empty* map must still be cached: the previous code treated an
 * empty redirect list as a miss and refetched the API on every request.
 */
async function getRedirectMap(): Promise<Map<string, RedirectRule>> {
  const now = Date.now();

  if (redirectMap && now - lastCacheTime < CACHE_TTL_MS) {
    return redirectMap;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const res = await fetch(`${apiUrl}/redirects/active`, {
      next: { revalidate: 300 }
    });

    if (res.ok) {
      const rules: RedirectRule[] = await res.json();
      const map = new Map<string, RedirectRule>();

      for (const rule of rules ?? []) {
        const src = rule.source_url.length > 1 && rule.source_url.endsWith('/') ? rule.source_url.slice(0, -1) : rule.source_url;
        map.set(src.toLowerCase(), rule);
      }

      redirectMap = map;
      lastCacheTime = now;
      return map;
    }
  } catch (e) {
    // Fallback quietly if backend is not yet booted or during build
  }

  // Keep serving the previous snapshot rather than hammering a failing backend
  // on every request.
  if (redirectMap) {
    return redirectMap;
  }

  redirectMap = new Map();
  return redirectMap;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js requests, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Normalize path for matching redirects (strip trailing slash for dictionary lookup)
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // Check active redirects from database/API
  const redirectMapForRequest = await getRedirectMap();
  const matched = redirectMapForRequest.get(normalizedPath.toLowerCase());

  if (matched) {
    const destination = matched.destination_url;
    const destNormalized = destination.length > 1 && destination.endsWith('/') ? destination.slice(0, -1) : destination;

    // Prevent infinite loop if destination equals current path
    if (destNormalized.toLowerCase() === normalizedPath.toLowerCase()) {
      return NextResponse.next();
    }

    const statusCode = matched.status_code || 301;

    // Fire non-blocking hit increment. Kept off the response path so redirect
    // latency never depends on a database write.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    fetch(`${apiUrl}/redirects/hit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_url: matched.source_url })
    }).catch(() => {});

    if (destination.startsWith('http://') || destination.startsWith('https://')) {
      return NextResponse.redirect(new URL(destination), statusCode);
    } else {
      const url = request.nextUrl.clone();
      url.pathname = destination.startsWith('/') ? destination : `/${destination}`;
      return NextResponse.redirect(url, statusCode);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.svg
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
};
