<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GalleryController extends Controller
{
    public function index()
    {
        $items = Cache::remember('fh_gallery_all', 3600, function () {
            return GalleryItem::orderBy('created_at', 'desc')->get();
        });
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:Infrastructure,Towers,Amenities,Entrance',
            'image_url' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $id = 'gal-' . time() . '-' . rand(1000, 9999);

        $item = GalleryItem::create([
            'id' => $id,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'image_url' => $validated['image_url'],
            'description' => $validated['description'] ?? '',
            'date_added' => now()->format('F Y'),
        ]);

        Cache::forget('fh_gallery_all');

        return response()->json($item, 201);
    }

    public function destroy(string $id)
    {
        $item = GalleryItem::find($id);
        if (!$item) {
            return response()->json(['message' => 'Gallery item not found'], 404);
        }

        $item->delete();
        Cache::forget('fh_gallery_all');

        return response()->json(['message' => 'Gallery image deleted successfully']);
    }
}
