<?php

namespace App\Http\Controllers;

use App\Models\Plot;
use App\Support\CachedValue;
use App\Support\DerivedCacheRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class PlotController extends Controller
{
    /** Full inventory, cached because every page re-requests it. */
    private const CACHE_ALL = 'fh_plots_all';

    private const CACHE_ALL_TTL = 300;

    /** Filtered permutations are short lived and bounded in number. */
    private const CACHE_QUERY_PREFIX = 'fh_plots_q_';

    private const CACHE_QUERY_TTL = 60;

    private const CACHE_SHOW_PREFIX = 'fh_plot_';

    private const CACHE_REGISTRY = 'fh_plots_registry';

    /**
     * Hard ceiling on distinct cached derivations. Without this, a crawler
     * walking `?search=<random>` would write one cache row per request and turn
     * the cache into a write-amplification vector.
     */
    private const MAX_CACHED_QUERIES = 250;

    private function registry(): DerivedCacheRegistry
    {
        return new DerivedCacheRegistry(self::CACHE_REGISTRY, self::MAX_CACHED_QUERIES, self::CACHE_ALL_TTL);
    }

    public function index(Request $request)
    {
        $filters = $this->normalizeFilters($request);

        if ($filters === []) {
            return $this->respond($this->allPlots());
        }

        $cacheKey = $this->queryCacheKey($filters);
        $registry = $this->registry();

        if ($registry->register($cacheKey)) {
            $cached = Cache::get($cacheKey);

            if ($cached !== null) {
                return $this->respond($cached);
            }
        }

        $plots = Plot::query()
            ->inBlock($filters['block'] ?? null)
            ->ofPropertyType($filters['property_type'] ?? null)
            ->ofCategory($filters['category'] ?? null)
            ->withStatus($filters['status'] ?? null)
            ->featured($filters['featured'] ?? null)
            ->withinPriceRange($filters['min_price'] ?? null, $filters['max_price'] ?? null)
            ->search($filters['search'] ?? null)
            ->ordered()
            ->get();

        Cache::put($cacheKey, $plots, self::CACHE_QUERY_TTL);

        // `limit` is applied after caching so one cached entry serves every
        // page size for the same filter combination.
        if (isset($filters['limit'])) {
            $plots = $plots->take($filters['limit']);
        }

        return $this->respond($plots);
    }

    /**
     * Drop every cached read representation of the inventory. Called from the
     * write paths so a price edit is visible on the very next read.
     */
    private function flushPlotCache(): void
    {
        $this->registry()->flush(self::CACHE_ALL);
    }

    /**
     * @return array<string, mixed>
     */
    private function normalizeFilters(Request $request): array
    {
        $filters = [];

        foreach (['block', 'property_type', 'category', 'status'] as $key) {
            $value = $request->query($key);

            if (is_string($value) && trim($value) !== '') {
                $filters[$key] = trim($value);
            }
        }

        // An explicitly empty search means "no search", not "match nothing".
        $search = $request->query('search');

        if (is_string($search) && trim($search) !== '') {
            $filters['search'] = trim($search);
        }

        if ($request->has('featured')) {
            $filters['featured'] = $request->boolean('featured');
        }

        foreach (['min_price', 'max_price'] as $key) {
            $value = $request->query($key);

            if ($value !== null && is_numeric($value)) {
                $filters[$key] = (float) $value;
            }
        }

        $limit = $request->query('limit');

        if ($limit !== null && is_numeric($limit)) {
            $filters['limit'] = max(1, min(500, (int) $limit));
        }

        return $filters;
    }

    /**
     * @return \Illuminate\Support\Collection<int, Plot>
     */
    private function allPlots()
    {
        return Cache::remember(self::CACHE_ALL, self::CACHE_ALL_TTL, function () {
            return Plot::query()->ordered()->get();
        });
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    private function queryCacheKey(array $filters): string
    {
        ksort($filters);

        $signature = [];

        foreach ($filters as $key => $value) {
            // `limit` is a response-shaping hint, not part of the result identity:
            // caching the unbounded result and slicing afterwards is cheaper.
            if ($key === 'limit') {
                continue;
            }

            $signature[] = $key.'='.(is_bool($value) ? (int) $value : $value);
        }

        return self::CACHE_QUERY_PREFIX.sha1(implode('|', $signature));
    }

    private function respond($plots)
    {
        return response()->json($plots);
    }

    public function show(string $id)
    {
        $cacheKey = self::CACHE_SHOW_PREFIX.$id;
        $registry = $this->registry();

        // Above the registry ceiling the record is still served, just uncached.
        if (! $registry->register($cacheKey)) {
            $plot = Plot::query()->find($id);

            return $plot
                ? $this->respond($plot)
                : response()->json(['message' => 'Plot not found'], 404);
        }

        // Absence is cached too, so a crawler walking random plot ids cannot
        // turn this endpoint into an unbounded query source.
        $plot = CachedValue::remember(
            $cacheKey,
            self::CACHE_ALL_TTL,
            fn () => Plot::query()->find($id)
        );

        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        return response()->json($plot);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plot_number' => 'nullable|string',
            'block_slug' => 'required|string',
            'block_name' => 'required|string',
            'property_type' => 'nullable|string', // Residential, Commercial
            'category' => 'nullable|string', // Residential, Commercial, Apartment
            'size' => 'required|string',
            'dimensions' => 'nullable|string',
            'price' => 'nullable|numeric',
            'price_unit' => 'nullable|string',
            'status' => 'nullable|string',
            'facing' => 'nullable|string',
            'street' => 'nullable|string',
            'location' => 'nullable|string',
            'map_coords' => 'nullable|array',
            'features' => 'nullable|array',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'featured' => 'nullable|boolean',
            'display_order' => 'nullable|integer'
        ]);

        // Auto-generate string ID if not supplied
        $id = $request->input('id') ?: 'plot-' . Str::uuid()->getHex()->toString();

        // Normalize price input (whether provided in Lacs e.g. 55 or full PKR e.g. 5500000)
        $rawPrice = isset($validated['price']) && $validated['price'] !== null ? floatval($validated['price']) : null;
        $price = null;
        $priceFormatted = 'Contact for Price';

        if ($rawPrice !== null && $rawPrice > 0) {
            if ($rawPrice < 1000) {
                // If user entered e.g. 55 or 78 or 120 (Lacs) or 1.25 (Crore)
                if ($rawPrice <= 20 && fmod($rawPrice, 1) !== 0.0) {
                    $price = $rawPrice * 10000000; // e.g. 1.25 -> 1.25 Crore = 12,500,000
                } else {
                    $price = $rawPrice * 100000; // e.g. 55 -> 55 Lacs = 5,500,000
                }
            } else {
                $price = $rawPrice;
            }

            if ($price >= 10000000) {
                $priceFormatted = 'PKR ' . number_format($price / 10000000, 2) . ' Crore';
            } else if ($price >= 100000) {
                $priceFormatted = 'PKR ' . number_format($price / 100000, 1) . ' Lacs';
            } else {
                $priceFormatted = 'PKR ' . number_format($price);
            }
        }

        $plot = Plot::create([
            'id' => $id,
            'plot_number' => $validated['plot_number'] ?? null,
            'block_slug' => $validated['block_slug'],
            'block_name' => $validated['block_name'],
            'property_type' => $validated['property_type'] ?? 'Residential',
            'category' => $validated['category'] ?? ($validated['property_type'] ?? 'Residential'),
            'size' => $validated['size'],
            'dimensions' => $validated['dimensions'] ?? 'Dimension not provided',
            'price' => $price,
            'price_unit' => $validated['price_unit'] ?? 'Total Price',
            'price_formatted' => $priceFormatted,
            'price_history_trend' => '+0% new listing',
            'status' => $validated['status'] ?? 'Available',
            'facing' => $validated['facing'] ?? 'Standard',
            'street' => $validated['street'] ?? null,
            'location' => $validated['location'] ?? null,
            'map_coords' => $validated['map_coords'] ?? ['x' => 50, 'y' => 50],
            'features' => $validated['features'] ?? [],
            'description' => $validated['description'] ?? '',
            'image' => $validated['image'] ?? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            'featured' => $validated['featured'] ?? false,
            'display_order' => $validated['display_order'] ?? 0
        ]);

        $this->flushPlotCache();

        return response()->json($plot, 201);
    }

    public function update(Request $request, string $id)
    {
        $plot = Plot::find($id);
        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $validated = $request->validate([
            'plot_number' => 'nullable|string',
            'block_slug' => 'sometimes|string',
            'block_name' => 'sometimes|string',
            'property_type' => 'sometimes|string',
            'category' => 'sometimes|string',
            'size' => 'sometimes|string',
            'dimensions' => 'sometimes|string',
            'price' => 'nullable|numeric',
            'price_unit' => 'sometimes|string',
            'status' => 'sometimes|string',
            'facing' => 'nullable|string',
            'street' => 'nullable|string',
            'location' => 'nullable|string',
            'map_coords' => 'sometimes|array',
            'features' => 'sometimes|array',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'featured' => 'sometimes|boolean',
            'display_order' => 'sometimes|integer'
        ]);

        // If price is updated, recalculate formatted price
        if (array_key_exists('price', $validated)) {
            $rawPrice = $validated['price'] !== null ? floatval($validated['price']) : null;
            if ($rawPrice !== null && $rawPrice > 0) {
                if ($rawPrice < 1000) {
                    if ($rawPrice <= 20 && fmod($rawPrice, 1) !== 0.0) {
                        $price = $rawPrice * 10000000;
                    } else {
                        $price = $rawPrice * 100000;
                    }
                } else {
                    $price = $rawPrice;
                }

                $oldPrice = $plot->price;
                $plot->price = $price;
                $validated['price'] = $price;

                if ($price >= 10000000) {
                    $plot->price_formatted = 'PKR ' . number_format($price / 10000000, 2) . ' Crore';
                } else if ($price >= 100000) {
                    $plot->price_formatted = 'PKR ' . number_format($price / 100000, 1) . ' Lacs';
                } else {
                    $plot->price_formatted = 'PKR ' . number_format($price);
                }
                $validated['price_formatted'] = $plot->price_formatted;
                
                if ($oldPrice && $oldPrice > 0) {
                    $diff = $price - $oldPrice;
                    if ($diff != 0) {
                        $pct = number_format(($diff / $oldPrice) * 100, 1);
                        $sign = $diff > 0 ? '+' : '';
                        $plot->price_history_trend = $sign . $pct . '% updated';
                        $validated['price_history_trend'] = $plot->price_history_trend;
                    }
                }
            } else {
                $plot->price = null;
                $plot->price_formatted = 'Contact for Price';
                $validated['price'] = null;
                $validated['price_formatted'] = 'Contact for Price';
            }
        }

        $plot->update($validated);
        $this->flushPlotCache();

        return response()->json($plot);
    }

    public function destroy(string $id)
    {
        $plot = Plot::find($id);
        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $plot->delete();
        $this->flushPlotCache();

        return response()->json(['message' => 'Plot deleted successfully']);
    }
}
