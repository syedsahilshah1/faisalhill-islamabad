<?php

namespace App\Http\Controllers;

use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PlotController extends Controller
{
    public function index()
    {
        return response()->json(Plot::orderBy('created_at', 'desc')->get());
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
            'plot_number' => 'required|string',
            'block_slug' => 'required|string',
            'block_name' => 'required|string',
            'category' => 'required|string', // Residential, Commercial, Apartment
            'size' => 'required|string',
            'dimensions' => 'required|string',
            'price' => 'required|numeric',
            'facing' => 'required|string',
            'map_coords' => 'nullable|array',
            'features' => 'nullable|array',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        // Auto-generate string ID
        $id = 'plot-' . Str::uuid()->getHex()->toString();

        // Helper to format price in Lacs / Crore
        $price = $validated['price'];
        $priceFormatted = '';
        if ($price >= 10000000) {
            $priceFormatted = 'PKR ' . number_format($price / 10000000, 2) . ' Crore';
        } else {
            $priceFormatted = 'PKR ' . number_format($price / 100000, 1) . ' Lacs';
        }

        $plot = Plot::create([
            'id' => $id,
            'plot_number' => $validated['plot_number'],
            'block_slug' => $validated['block_slug'],
            'block_name' => $validated['block_name'],
            'category' => $validated['category'],
            'size' => $validated['size'],
            'dimensions' => $validated['dimensions'],
            'price' => $price,
            'price_formatted' => $priceFormatted,
            'price_history_trend' => '+0% new listing',
            'status' => 'Available',
            'facing' => $validated['facing'],
            'map_coords' => $validated['map_coords'] ?? ['x' => 50, 'y' => 50],
            'features' => $validated['features'] ?? [],
            'description' => $validated['description'] ?? '',
            'image' => $validated['image'] ?? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        ]);

        return response()->json($plot, 201);
    }

    public function update(Request $request, string $id)
    {
        $plot = Plot::find($id);
        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $validated = $request->validate([
            'plot_number' => 'sometimes|string',
            'block_slug' => 'sometimes|string',
            'block_name' => 'sometimes|string',
            'category' => 'sometimes|string',
            'size' => 'sometimes|string',
            'dimensions' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'status' => 'sometimes|string|in:Available,Reserved,Sold',
            'facing' => 'sometimes|string',
            'map_coords' => 'sometimes|array',
            'features' => 'sometimes|array',
            'description' => 'sometimes|string',
            'image' => 'sometimes|string',
        ]);

        // If price is updated, recalculate formatted price
        if (isset($validated['price'])) {
            $price = $validated['price'];
            if ($price >= 10000000) {
                $plot->price_formatted = 'PKR ' . number_format($price / 10000000, 2) . ' Crore';
            } else {
                $plot->price_formatted = 'PKR ' . number_format($price / 100000, 1) . ' Lacs';
            }
            
            // Add custom history trend
            $diff = $price - $plot->price;
            if ($diff != 0) {
                $pct = number_format(($diff / $plot->price) * 100, 1);
                $sign = $diff > 0 ? '+' : '';
                $plot->price_history_trend = $sign . $pct . '% updated';
            }
        }

        $plot->update($validated);

        return response()->json($plot);
    }

    public function destroy(string $id)
    {
        $plot = Plot::find($id);
        if (!$plot) {
            return response()->json(['message' => 'Plot not found'], 404);
        }

        $plot->delete();

        return response()->json(['message' => 'Plot deleted successfully']);
    }
}
