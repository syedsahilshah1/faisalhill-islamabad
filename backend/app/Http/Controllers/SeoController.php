<?php

namespace App\Http\Controllers;

use App\Models\SeoConfig;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function index()
    {
        $global = SiteSetting::where('key', 'seo_global')->first();
        $pages = SeoConfig::all();
        
        return response()->json([
            'siteName' => $global ? ($global->value['siteName'] ?? 'Faisal Hills') : 'Faisal Hills',
            'defaultMetaDescription' => $global ? ($global->value['defaultMetaDescription'] ?? '') : '',
            'defaultKeywords' => $global ? ($global->value['defaultKeywords'] ?? '') : '',
            'pages' => $pages
        ]);
    }

    public function show(string $pageSlug)
    {
        $seo = SeoConfig::where('page_slug', $pageSlug)->first();
        
        if (!$seo) {
            // Check if page slug corresponds to a block page slug, return a default Block SEO
            return response()->json([
                'page_slug' => $pageSlug,
                'title' => 'Faisal Hills | ' . ucwords(str_replace('-', ' ', $pageSlug)),
                'meta_description' => 'Explore plot inventory, map coords and pricing for block ' . $pageSlug,
                'keywords' => 'faisal hills, ' . str_replace('-', ' ', $pageSlug),
                'og_title' => null,
                'og_description' => null
            ]);
        }
        
        return response()->json($seo);
    }

    public function update(Request $request, string $pageSlug)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'meta_description' => 'required|string',
            'keywords' => 'nullable|string',
            'og_title' => 'nullable|string',
            'og_description' => 'nullable|string',
        ]);

        $seo = SeoConfig::updateOrCreate(
            ['page_slug' => $pageSlug],
            $validated
        );

        return response()->json([
            'message' => 'SEO Configuration updated successfully',
            'seo' => $seo
        ]);
    }

    public function updateGlobal(Request $request)
    {
        $validated = $request->validate([
            'siteName' => 'required|string',
            'defaultMetaDescription' => 'required|string',
            'defaultKeywords' => 'required|string',
        ]);

        $setting = SiteSetting::updateOrCreate(
            ['key' => 'seo_global'],
            ['value' => $validated]
        );

        return response()->json([
            'message' => 'Global SEO settings updated successfully',
            'global' => $setting->value
        ]);
    }
}
