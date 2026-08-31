<?php

namespace App\Http\Controllers;

use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class PlotController extends Controller
{
    public function index(Request $request)
    {
        $hasFilters = $request->filled('block') || $request->filled('property_type') || $request->filled('category') || $request->filled('search');

        if (!$hasFilters) {
            $cached = Cache::remember('fh_plots_all', 300, function () {
                return Plot::orderBy('display_order', 'asc')
                           ->orderBy('created_at', 'desc')
                           ->get();
            });
            return response()->json($cached);
        }
        $query = Plot::query();

        // Optional block filter
        if ($request->filled('block')) {
            $query->where('block_slug', $request->block);
        }

        // Optional property type / category filter
        if ($request->filled('property_type')) {
            $query->where('property_type', $request->property_type);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Optional search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('plot_number', 'like', "%{$search}%")
                  ->orWhere('size', 'like', "%{$search}%")
                  ->orWhere('block_name', 'like', "%{$search}%")
                  ->orWhere('facing', 'like', "%{$search}%")
                  ->orWhere('street', 'like', "%{$search}%");
            });
        }

        // Ordering: display_order asc, created_at desc
        $plots = $query->orderBy('display_order', 'asc')
                       ->orderBy('created_at', 'desc')
                       ->get();

        return response()->json($plots);
    }

    public function show(string $id)
    {
        $plot = Plot::find($id);
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

        Cache::forget('fh_plots_all');

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

                $plot->price = $price;
                if ($price >= 10000000) {
                    $plot->price_formatted = 'PKR ' . number_format($price / 10000000, 2) . ' Crore';
                } else if ($price >= 100000) {
                    $plot->price_formatted = 'PKR ' . number_format($price / 100000, 1) . ' Lacs';
                } else {
                    $plot->price_formatted = 'PKR ' . number_format($price);
                }
                
                if ($plot->price && $plot->price > 0) {
                    $diff = $price - $plot->price;
                    if ($diff != 0) {
                        $pct = number_format(($diff / $plot->price) * 100, 1);
                        $sign = $diff > 0 ? '+' : '';
                        $plot->price_history_trend = $sign . $pct . '% updated';
                    }
                }
            } else {
                $plot->price = null;
                $plot->price_formatted = 'Contact for Price';
            }
        }

        $plot->update($validated);
        Cache::forget('fh_plots_all');

        return response()->json($plot);
    }

    public function destroy(string $id)
    {
        $plot = Plot::find($id);
        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $plot->delete();
        Cache::forget('fh_plots_all');

        return response()->json(['message' => 'Plot deleted successfully']);
    }
}
