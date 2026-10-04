<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

/**
 * Tracks derived cache keys so a write can invalidate everything derived from a
 * table in one pass.
 *
 * Without this, every read representation (full list, each filter permutation,
 * each single record) needs its own hard-coded `Cache::forget()` at every write
 * site, and the moment one is missed the API serves stale inventory.
 *
 * Every cache call here is guarded. This registry sits in front of the cache
 * rather than beside it, so an unguarded failure here propagates into the
 * request that merely asked for a list of plots — an unwritable cache store
 * would take the endpoint down rather than just slowing it down.
 */
final class DerivedCacheRegistry
{
    public function __construct(
        private readonly string $registryKey,
        private readonly int $maxEntries,
        private readonly int $registryTtl,
    ) {
    }

    /**
     * Remember a key and report whether it may be used.
     *
     * Returns false once the ceiling is reached, which is the guard against
     * unbounded cache growth from high-cardinality input such as
     * `?search=<random>`.
     */
    public function register(string $key): bool
    {
        $keys = $this->all();

        if (in_array($key, $keys, true)) {
            return true;
        }

        if (count($keys) >= $this->maxEntries) {
            return false;
        }

        $keys[] = $key;

        try {
            Cache::put($this->registryKey, $keys, $this->registryTtl);
        } catch (\Throwable $e) {
            // Not being able to record the key only costs a later lookup. The
            // caller still gets its data, so this must not propagate.
            report($e);
        }

        return true;
    }

    /**
     * Forget every tracked key, the tracked list itself, and any additional
     * keys the caller passes in (such as a canonical "all records" key).
     */
    public function flush(string ...$extraKeys): void
    {
        foreach (array_merge($this->all(), $extraKeys, [$this->registryKey]) as $key) {
            try {
                Cache::forget($key);
            } catch (\Throwable $e) {
                // Keep evicting the rest; one unwritable key must not strand the
                // others and leave the API serving stale data.
                report($e);
            }
        }
    }

    /**
     * @return array<int, string>
     */
    private function all(): array
    {
        try {
            $keys = Cache::get($this->registryKey, []);
        } catch (\Throwable $e) {
            // Treated as "nothing tracked yet": every key gets its own write
            // attempt, which is the same behaviour as a cold cache.
            report($e);

            return [];
        }

        return is_array($keys) ? $keys : [];
    }
}