<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use App\Support\MediaStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GalleryController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

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

    /**
     * Store an image file and return its URL.
     *
     * This route was registered in `routes/api.php` pointing at an `upload`
     * method that did not exist, so every POST to it failed with a 500. The
     * gallery editor is the one place that genuinely needs to send bytes rather
     * than a reference, which is why it keeps its own endpoint rather than
     * sharing the generic media route.
     */
    public function upload(Request $request)
    {
        $validated = $request->validate([
            'image' => [
                'required',
                'file',
                'image',
                'mimetypes:'.implode(',', array_keys(MediaStorage::ALLOWED_MIME_TYPES)),
                'max:'.MediaStorage::MAX_KILOBYTES,
            ],
        ]);

        return response()->json([
            'message' => 'Image uploaded successfully.',
            'url' => $this->media->storeImage($validated['image'], 'gallery'),
        ], 201);
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
