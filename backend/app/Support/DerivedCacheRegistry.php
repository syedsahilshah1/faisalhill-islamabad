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
        Cache::put($this->registryKey, $keys, $this->registryTtl);

        return true;
    }

    /**
     * Forget every tracked key, the tracked list itself, and any additional
     * keys the caller passes in (such as a canonical "all records" key).
     */
    public function flush(string ...$extraKeys): void
    {
        foreach ($this->all() as $key) {
            Cache::forget($key);
        }

        foreach ($extraKeys as $key) {
            Cache::forget($key);
        }

        Cache::forget($this->registryKey);
    }

    /**
     * @return array<int, string>
     */
    private function all(): array
    {
        $keys = Cache::get($this->registryKey, []);

        return is_array($keys) ? $keys : [];
    }
}