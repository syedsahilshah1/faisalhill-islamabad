<?php

namespace App\Http\Controllers;

use App\Models\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class RedirectController extends Controller
{
    private const CACHE_ACTIVE = 'fh_redirects_active';

    private const CACHE_ACTIVE_TTL = 300;

    /**
     * Get all redirects (for admin management)
     */
    public function index()
    {
        $redirects = Redirect::orderBy('created_at', 'desc')->get();
        return response()->json($redirects);
    }

    /**
     * Get only active redirects (public fast endpoint for Next.js middleware)
     *
     * This endpoint sits in front of every single page request, so it is served
     * from cache. Without the cache each page view costs a query plus the
     * hydration cost of deserialising the result.
     */
    public function active()
    {
        $redirects = Cache::remember(self::CACHE_ACTIVE, self::CACHE_ACTIVE_TTL, function () {
            return Redirect::where('is_active', true)
                ->select(['source_url', 'destination_url', 'status_code'])
                ->get();
        });

        return response()->json($redirects);
    }

    /**
     * Create a new redirect
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'source_url' => 'required|string|unique:redirects,source_url',
            'destination_url' => 'required|string',
            'status_code' => 'nullable|integer|in:301,302,307,308',
            'is_active' => 'nullable|boolean',
            'notes' => 'nullable|string'
        ]);

        // Normalize source_url
        $source = '/' . ltrim($validated['source_url'], '/');
        $validated['source_url'] = $source;
        if (!isset($validated['status_code'])) $validated['status_code'] = 301;
        if (!isset($validated['is_active'])) $validated['is_active'] = true;

        $redirect = Redirect::create($validated);

        $this->flushActiveCache();

        return response()->json([
            'message' => 'Redirect created successfully',
            'redirect' => $redirect
        ], 201);
    }

    /**
     * Update an existing redirect
     */
    public function update(Request $request, int $id)
    {
        $redirect = Redirect::findOrFail($id);

        $validated = $request->validate([
            'source_url' => 'required|string|unique:redirects,source_url,' . $id,
            'destination_url' => 'required|string',
            'status_code' => 'nullable|integer|in:301,302,307,308',
            'is_active' => 'nullable|boolean',
            'notes' => 'nullable|string'
        ]);

        $source = '/' . ltrim($validated['source_url'], '/');
        $validated['source_url'] = $source;

        $redirect->update($validated);

        $this->flushActiveCache();

        return response()->json([
            'message' => 'Redirect updated successfully',
            'redirect' => $redirect
        ]);
    }

    /**
     * Increment hit counter when a redirect is triggered
     *
     * Uses a single atomic UPDATE rather than read-then-write. The old shape
     * cost a SELECT plus an UPDATE on a code path the Next.js middleware hits
     * once per matched redirect, which made the counter a write-amplification
     * point under traffic.
     */
    public function incrementHit(Request $request)
    {
        $request->validate(['source_url' => 'required|string']);
        $source = '/' . ltrim($request->source_url, '/');

        $affected = Redirect::where('source_url', $source)->increment('hits');

        if ($affected === 0) {
            return response()->json(['success' => false], 404);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Delete a redirect
     */
    public function destroy(int $id)
    {
        $redirect = Redirect::findOrFail($id);
        $redirect->delete();

        $this->flushActiveCache();

        return response()->json([
            'message' => 'Redirect deleted successfully'
        ]);
    }

    private function flushActiveCache(): void
    {
        Cache::forget(self::CACHE_ACTIVE);
    }
}
