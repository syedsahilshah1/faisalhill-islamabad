import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory cache for fast redirect lookups
let cachedRedirects: { source_url: string; destination_url: string; status_code: number }[] = [];
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

async function getRedirects(): Promise<{ source_url: string; destination_url: string; status_code: number }[]> {
  const now = Date.now();
  if (cachedRedirects.length > 0 && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedRedirects;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const res = await fetch(`${apiUrl}/redirects/active`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      cachedRedirects = await res.json();
      lastCacheTime = now;
      return cachedRedirects;
    }
  } catch (e) {
    // Fallback quietly if backend is not yet booted or during build
  }

  return cachedRedirects;
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
  const redirects = await getRedirects();
  const matched = redirects.find(r => {
    const src = r.source_url.length > 1 && r.source_url.endsWith('/') ? r.source_url.slice(0, -1) : r.source_url;
    return src.toLowerCase() === normalizedPath.toLowerCase();
  });

  if (matched) {
    const destination = matched.destination_url;
    const destNormalized = destination.length > 1 && destination.endsWith('/') ? destination.slice(0, -1) : destination;

    // Prevent infinite loop if destination equals current path
    if (destNormalized.toLowerCase() === normalizedPath.toLowerCase()) {
      return NextResponse.next();
    }

    const statusCode = matched.status_code || 301;

    // Fire non-blocking hit increment
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
