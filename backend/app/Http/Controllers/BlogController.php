<?php

namespace App\Http\Controllers;

use App\Models\Blog;
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
            'content' => 'required|string',
            'summary' => 'nullable|string',
            'image_url' => 'nullable|string',
            'author' => 'nullable|string',
            'category' => 'nullable|string',
            'read_time' => 'nullable|string',
            'published' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'faqs' => 'nullable|array',
        ]);

        $id = 'blog-' . (string) Str::uuid();
        
        // Generate unique slug
        $baseSlug = Str::slug($validated['title']);
        $slug = $baseSlug;
        $count = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        $blog = Blog::create([
            'id' => $id,
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'summary' => $request->input('summary') ?? Str::limit(strip_tags($validated['content']), 150),
            'image_url' => $request->input('image_url') ?? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
            'author' => $request->input('author') ?? 'Admin',
            'category' => $request->input('category') ?? 'Market Update',
            'read_time' => $request->input('read_time') ?? '3 min read',
            'published' => $request->has('published') ? $request->boolean('published') : true,
            'meta_title' => $request->input('meta_title') ?? $validated['title'],
            'meta_description' => $request->input('meta_description') ?? ($request->input('summary') ?? Str::limit(strip_tags($validated['content']), 150)),
            'keywords' => $request->input('keywords') ?? '',
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
            'content' => 'sometimes|required|string',
            'summary' => 'nullable|string',
            'image_url' => 'nullable|string',
            'author' => 'nullable|string',
            'category' => 'nullable|string',
            'read_time' => 'nullable|string',
            'published' => 'nullable|boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'keywords' => 'nullable|string',
            'faqs' => 'nullable|array',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $blog->title) {
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $count = 1;
            while (Blog::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }
            $blog->slug = $slug;
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
