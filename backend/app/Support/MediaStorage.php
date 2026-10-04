<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Stores dashboard image uploads as real files.
 *
 * The dashboard previously had no upload endpoint at all: `ImageUploader`
 * downscaled the image in the browser, re-encoded it to a base64 data URL, and
 * stored that string in the settings JSON column. That has four consequences
 * worth naming, because they are why this class exists:
 *
 *  1. Every render of a CMS editor re-reads and re-decodes a data URL that can
 *     be several hundred kilobytes, because the bytes travel inside the settings
 *     payload instead of living in a file the browser can cache.
 *  2. A settings row carrying images is read by *every* page that fetches
 *     settings, including pages that only need a phone number.
 *  3. Replacing an image rewrites the whole settings blob, so the write
 *     amplifies with the size of every other field in it.
 *  4. Nothing on the server ever validated that the "image" was an image.
 *
 * Storing files separates the bytes from the content, lets the browser cache
 * them, and puts MIME and size enforcement in one place.
 */
final class MediaStorage
{
    /**
     * Accepted upload types, keyed by the MIME type Laravel will check for.
     *
     * SVG is deliberately excluded: it is a scriptable document, so serving one
     * from the site's own origin turns any stored-content bug into stored XSS.
     */
    public const ALLOWED_MIME_TYPES = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/avif' => 'avif',
        'image/gif' => 'gif',
    ];

    /**
     * Cap on a single upload.
     *
     * The editor still downsizes in the browser, so a genuine photo lands far
     * below this. The ceiling exists to stop a large request from being written
     * to disk before anything has inspected it.
     */
    public const MAX_KILOBYTES = 4096;

    /**
     * Where uploads live, relative to the public disk root.
     *
     * Grouped by year and month so a single directory never accumulates an
     * unbounded number of entries, which degrades on every filesystem that does
     * a linear directory scan.
     */
    private const BASE_PATH = 'cms';

    /**
     * Persist an uploaded image and return its publicly servable URL.
     *
     * The stored name is generated rather than derived from the original
     * filename. A user-supplied name is attacker-controlled and would let a
     * caller choose the extension, the path separators, or overwrite an existing
     * file with `../`.
     */
    public function storeImage(UploadedFile $file, string $folder = ''): string
    {
        $extension = self::ALLOWED_MIME_TYPES[$file->getMimeType()] ?? null;

        if ($extension === null) {
            throw new RuntimeException('Unsupported image type.');
        }

        $directory = self::BASE_PATH
            .'/'.$this->safeFolder($folder)
            .'/'.now()->format('Y/m');

        $name = Str::random(32).'.'.$extension;

        Storage::disk('public')->putFileAs($directory, $file, $name);

        return Storage::disk('public')->url($directory.'/'.$name);
    }

    /**
     * Constrain a caller-supplied folder to a single safe path segment.
     *
     * The value arrives in the request body, so it is untrusted input. Anything
     * containing a separator or a traversal sequence collapses to `general`,
     * which keeps a caller from writing outside the intended media tree.
     */
    private function safeFolder(string $folder): string
    {
        $slug = Str::slug($folder);

        if ($slug === '' || str_contains($slug, '.')) {
            return 'general';
        }

        return Str::limit($slug, 40, '');
    }
}
