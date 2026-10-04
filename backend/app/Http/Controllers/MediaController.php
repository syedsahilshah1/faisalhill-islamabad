<?php

namespace App\Http\Controllers;

use App\Support\MediaStorage;
use Illuminate\Http\Request;

/**
 * Dashboard image uploads.
 *
 * Returns a URL rather than the file contents, so callers persist a reference
 * instead of a blob. That is what lets `ImageUploader` stop writing base64 into
 * the settings JSON.
 */
class MediaController extends Controller
{
    private const CACHE_TTL = 31536000;

    public function __construct(private readonly MediaStorage $media) {}

    /**
     * Accept one image and return its stored location.
     *
     * The file must be sent as multipart under `image`; anything else fails
     * validation before the upload is touched.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => [
                'required',
                'file',
                'image',
                'mimetypes:'.implode(',', array_keys(MediaStorage::ALLOWED_MIME_TYPES)),
                'max:'.MediaStorage::MAX_KILOBYTES,
            ],
            // Optional label used only to group files on disk. Sanitised by
            // MediaStorage, so it cannot escape the media tree.
            'folder' => ['nullable', 'string', 'max:40'],
        ]);

        $url = $this->media->storeImage($validated['image'], $validated['folder'] ?? '');

        return response()->json([
            'message' => 'Image uploaded successfully.',
            'url' => $url,
        ], 201)->header('Cache-Control', 'public, max-age='.self::CACHE_TTL.', immutable');
    }
}
