<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adds HTTP conditional-request and shared-cache headers to public API reads.
 *
 * Without this, every visitor to the Next.js front end (and every ISR
 * revalidation) triggers a full controller run plus a database round trip.
 * With it, browsers and any reverse proxy in front of the app can serve repeat
 * visits from cache and revalidate with a 304 instead of a payload.
 *
 * The cache lifetime is deliberately short so an admin edit becomes visible
 * quickly, while stale-while-revalidate keeps latency flat during a revalidate.
 */
class CacheResponseHeaders
{
    /**
     * [max-age (browser), s-maxage (shared proxy/CDN), stale-while-revalidate]
     * keyed by longest matching path prefix. Values are in seconds.
     *
     * @var array<string, array{int, int, int}>
     */
    private const POLICIES = [
        '/api/plots' => [30, 60, 120],
        '/api/settings' => [60, 120, 300],
        '/api/seo' => [120, 300, 600],
        '/api/blocks' => [120, 300, 600],
        '/api/gallery' => [120, 300, 600],
        '/api/blogs' => [120, 300, 600],
        '/api/redirects' => [120, 300, 600],
        '/api/sitemap-routes' => [600, 3600, 21600],
    ];

    private const DEFAULT_POLICY = [30, 60, 120];

    private const CACHEABLE_METHODS = ['GET', 'HEAD'];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! $this->isCacheable($request, $response)) {
            return $response;
        }

        [$maxAge, $sharedMaxAge, $staleWhileRevalidate] = $this->policyFor($request->path());

        // Last-Modified has to exist before the comparison below, otherwise a
        // date-based revalidation could never match and every request would fall
        // through to a full payload.
        if ($response->headers->get('Last-Modified') === null) {
            $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s').' GMT');
        }

        $etag = $this->etagFor($response);

        if ($etag !== null && $this->clientHasCurrentVersion($request, $response, $etag)) {
            $notModified = response('', 304, $response->headers->all());
            $notModified->headers->remove('Content-Type');
            $notModified->headers->remove('Content-Length');

            return $this->withCacheHeaders($notModified, $maxAge, $sharedMaxAge, $staleWhileRevalidate, $etag);
        }

        return $this->withCacheHeaders($response, $maxAge, $sharedMaxAge, $staleWhileRevalidate, $etag);
    }

    private function isCacheable(Request $request, Response $response): bool
    {
        if (! in_array($request->getMethod(), self::CACHEABLE_METHODS, true)) {
            return false;
        }

        // Anything behind an admin token must never be written to a shared cache.
        if ($request->user() !== null || $request->bearerToken() !== null) {
            return false;
        }

        if ($response->getStatusCode() !== 200) {
            return false;
        }

        // Only opt in explicitly; controllers that opt out stay uncached.
        return $response->headers->get('X-Cacheable') !== 'false';
    }

    /**
     * @return array{int, int, int}
     */
    private function policyFor(string $path): array
    {
        foreach (self::POLICIES as $prefix => $policy) {
            if ($path === $prefix || str_starts_with($path, rtrim($prefix, '/').'/')) {
                return $policy;
            }
        }

        return self::DEFAULT_POLICY;
    }

    private function etagFor(Response $response): ?string
    {
        $content = $response->getContent();

        if ($content === false || $content === '') {
            return null;
        }

        return '"'.md5($content).'"';
    }

    private function clientHasCurrentVersion(Request $request, Response $response, string $etag): bool
    {
        $ifNoneMatch = $request->headers->get('If-None-Match');

        if ($ifNoneMatch !== null && $ifNoneMatch !== '') {
            foreach (array_map('trim', explode(',', $ifNoneMatch)) as $candidate) {
                if ($candidate === '*' || $candidate === $etag || ltrim($candidate, 'W/') === $etag) {
                    return true;
                }
            }

            return false;
        }

        $ifModifiedSince = $request->headers->get('If-Modified-Since');
        $lastModified = $response->headers->get('Last-Modified');

        if ($ifModifiedSince === null || $lastModified === null) {
            return false;
        }

        $since = strtotime($ifModifiedSince);
        $modified = strtotime($lastModified);

        return $since !== false && $modified !== false && $modified <= $since;
    }

    private function withCacheHeaders(
        Response $response,
        int $maxAge,
        int $sharedMaxAge,
        int $staleWhileRevalidate,
        ?string $etag
    ): Response {
        $headers = $response->headers;

        if ($etag !== null) {
            $headers->set('ETag', $etag);
        }

        $headers->set('Cache-Control', sprintf(
            'public, max-age=%d, s-maxage=%d, stale-while-revalidate=%d',
            $maxAge,
            $sharedMaxAge,
            $staleWhileRevalidate
        ));

        $headers->set('Vary', 'Accept-Encoding');

        return $response;
    }
}