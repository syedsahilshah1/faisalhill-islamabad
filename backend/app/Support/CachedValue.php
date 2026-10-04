<?php

namespace App\Support;

use Closure;
use Illuminate\Support\Facades\Cache;

/**
 * Read-through cache that also caches absence.
 *
 * The subtlety this exists to handle: a cache store cannot distinguish "nothing
 * cached" from "cached as null". The obvious implementation —
 *
 *     $value = Cache::get($key);
 *     if ($value === null) { $value = $resolver(); Cache::put($key, $value); }
 *
 * therefore re-runs the resolver on every request for a missing record, and
 * `Cache::remember()` has the same behaviour. On a public endpoint where a
 * crawler can walk arbitrary identifiers, that turns a cheap miss into an
 * unbounded source of database queries.
 *
 * Storing an explicit sentinel closes the gap while keeping the fast path to a
 * single cache read.
 */
final class CachedValue
{
    /** Marker stored in place of a null result. */
    public const MISSING = "\0fh:missing\0";

    /**
     * @template TValue
     *
     * @param  Closure(): TValue  $resolver
     * @return TValue
     */
    public static function remember(string $key, int $ttl, Closure $resolver, int $missTtl = 60): mixed
    {
        $cached = Cache::get($key);

        if ($cached === null) {
            $value = $resolver();
            Cache::put($key, $value ?? self::MISSING, $value === null ? $missTtl : $ttl);

            return $value;
        }

        return $cached === self::MISSING ? null : $cached;
    }
}