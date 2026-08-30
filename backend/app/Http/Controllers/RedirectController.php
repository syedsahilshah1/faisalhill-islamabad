<?php

namespace App\Http\Controllers;

use App\Models\Redirect;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
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
     */
    public function active()
    {
        $redirects = Redirect::where('is_active', true)->select(['source_url', 'destination_url', 'status_code'])->get();
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

        return response()->json([
            'message' => 'Redirect updated successfully',
            'redirect' => $redirect
        ]);
    }

    /**
     * Increment hit counter when a redirect is triggered
     */
    public function incrementHit(Request $request)
    {
        $request->validate(['source_url' => 'required|string']);
        $source = '/' . ltrim($request->source_url, '/');
        
        $redirect = Redirect::where('source_url', $source)->first();
        if ($redirect) {
            $redirect->increment('hits');
            return response()->json(['success' => true, 'hits' => $redirect->hits]);
        }
        
        return response()->json(['success' => false], 404);
    }

    /**
     * Delete a redirect
     */
    public function destroy(int $id)
    {
        $redirect = Redirect::findOrFail($id);
        $redirect->delete();

        return response()->json([
            'message' => 'Redirect deleted successfully'
        ]);
    }
}
