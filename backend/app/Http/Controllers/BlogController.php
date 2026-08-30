<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of published blogs.
     */
    public function index()
    {
        return response()->json(
            Blog::where('published', true)
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    /**
     * Display a listing of all blogs (published and draft) for admin.
     */
    public function adminIndex()
    {
        return response()->json(
            Blog::orderBy('created_at', 'desc')->get()
        );
    }

    /**
     * Display the specified blog post by its slug.
     */
    public function show(string $slug)
    {
        $blog = Blog::where('slug', $slug)->first();
        
        if (!$blog) {
            return response()->json(['message' => 'Blog post not found'], 404);
        }

        return response()->json($blog);
    }

    /**
     * Store a newly created blog post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'h1' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'content' => 'required|string',
            'summary' => 'nullable|string',
            'image_url' => 'nullable|string',
            'image_alt' => 'nullable|string',
            'author' => 'nullable|string',
            'category' => 'nullable|string',
            'read_time' => 'nullable|string',
            'published' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'canonical_url' => 'nullable|string',
            'robots_index' => 'nullable|boolean',
            'robots_follow' => 'nullable|boolean',
            'keywords' => 'nullable|string',
            'primary_keyword' => 'nullable|string',
            'secondary_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'twitter_image' => 'nullable|string',
            'faqs' => 'nullable|array',
        ]);

        $id = 'blog-' . (string) Str::uuid();
        
        // Generate unique slug
        $baseSlug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $slug = $baseSlug;
        $count = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        $blog = Blog::create([
            'id' => $id,
            'title' => $validated['title'],
            'h1' => $request->input('h1') ?? $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'summary' => $request->input('summary') ?? Str::limit(strip_tags($validated['content']), 150),
            'image_url' => $request->input('image_url') ?? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
            'image_alt' => $request->input('image_alt') ?? $validated['title'],
            'author' => $request->input('author') ?? 'Admin',
            'category' => $request->input('category') ?? 'Market Update',
            'read_time' => $request->input('read_time') ?? '3 min read',
            'published' => $request->has('published') ? $request->boolean('published') : true,
            'meta_title' => $request->input('meta_title') ?? $validated['title'],
            'meta_description' => $request->input('meta_description') ?? ($request->input('summary') ?? Str::limit(strip_tags($validated['content']), 150)),
            'canonical_url' => $request->input('canonical_url'),
            'robots_index' => $request->has('robots_index') ? $request->boolean('robots_index') : true,
            'robots_follow' => $request->has('robots_follow') ? $request->boolean('robots_follow') : true,
            'keywords' => $request->input('keywords') ?? '',
            'primary_keyword' => $request->input('primary_keyword'),
            'secondary_keywords' => $request->input('secondary_keywords'),
            'og_image' => $request->input('og_image') ?? $request->input('image_url'),
            'twitter_image' => $request->input('twitter_image') ?? $request->input('image_url'),
            'faqs' => $request->input('faqs') ?? [],
        ]);

        return response()->json($blog, 201);
    }

    /**
     * Update the specified blog post in storage.
     */
    public function update(Request $request, string $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog post not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'h1' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255',
            'content' => 'sometimes|required|string',
            'summary' => 'nullable|string',
            'image_url' => 'nullable|string',
            'image_alt' => 'nullable|string',
            'author' => 'nullable|string',
            'category' => 'nullable|string',
            'read_time' => 'nullable|string',
            'published' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'canonical_url' => 'nullable|string',
            'robots_index' => 'nullable|boolean',
            'robots_follow' => 'nullable|boolean',
            'keywords' => 'nullable|string',
            'primary_keyword' => 'nullable|string',
            'secondary_keywords' => 'nullable|string',
            'og_image' => 'nullable|string',
            'twitter_image' => 'nullable|string',
            'faqs' => 'nullable|array',
            'create_redirect' => 'nullable|boolean'
        ]);

        $oldSlug = $blog->slug;

        // Custom slug or title change
        if (!empty($validated['slug']) && $validated['slug'] !== $blog->slug) {
            $baseSlug = Str::slug($validated['slug']);
            $slug = $baseSlug;
            $count = 1;
            while (Blog::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }
            $blog->slug = $slug;
            unset($validated['slug']);

            // Auto-create 301 redirect if requested or if slug changed
            if ($request->boolean('create_redirect', true) && $oldSlug !== $slug) {
                Redirect::updateOrCreate(
                    ['source_url' => '/blogs/' . $oldSlug],
                    [
                        'destination_url' => '/blogs/' . $slug,
                        'status_code' => 301,
                        'is_active' => true,
                        'notes' => 'Auto-generated on blog slug update: ' . $blog->title
                    ]
                );
            }
        }

        $blog->update($validated);

        return response()->json($blog);
    }

    /**
     * Remove the specified blog post from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog post not found'], 404);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog post deleted successfully']);
    }
}
