<?php

namespace App\Http\Controllers;

use App\Models\SeoConfig;
use App\Models\SiteSetting;
use App\Models\Block;
use App\Models\Blog;
use App\Models\Plot;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function index()
    {
        $global = SiteSetting::where('key', 'seo_global')->first();
        $pages = SeoConfig::all();
        
        $globalDefaults = [
            'siteName' => 'Faisal Hills',
            'siteUrl' => 'https://faisalhills.com.pk',
            'titleSeparator' => '|',
            'defaultMetaTitle' => 'Faisal Hills Taxila & Islamabad | Master Plan, Plots & Prices',
            'defaultMetaDescription' => 'Explore Faisal Hills Rawalpindi & Islamabad. Interactive plot maps, RDA NOC status, block prices, payment plans and real estate investments.',
            'defaultKeywords' => 'Faisal Hills, Faisal Hills Taxila, Executive Block, Block A, Plot Prices, RDA Approved',
            'defaultOgImage' => '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
            'googleSiteVerification' => '',
            'bingSiteVerification' => '',
            'gtmId' => '',
            'gaMeasurementId' => '',
            'facebookAppId' => '',
            'twitterHandle' => '@FaisalHillsPK',
            'organizationName' => 'Zedem International (Pvt) Ltd - Faisal Hills',
            'organizationPhone' => '+92 304 4811717',
            'organizationEmail' => 'info@faisalhills.com.pk',
            'organizationAddress' => 'Main GT Road, Near MPCHS Interchange, Taxila / Rawalpindi',
            'defaultRobotsIndex' => true,
            'defaultRobotsFollow' => true,
        ];

        $globalSettings = $global ? array_merge($globalDefaults, $global->value ?? []) : $globalDefaults;

        return response()->json([
            'global' => $globalSettings,
            'siteName' => $globalSettings['siteName'],
            'defaultMetaDescription' => $globalSettings['defaultMetaDescription'],
            'defaultKeywords' => $globalSettings['defaultKeywords'],
            'pages' => $pages
        ]);
    }

    public function show(string $pageSlug)
    {
        $seo = SeoConfig::where('page_slug', $pageSlug)->first();
        
        if (!$seo) {
            $formattedTitle = ucwords(str_replace('-', ' ', $pageSlug));
            return response()->json([
                'page_slug' => $pageSlug,
                'title' => 'Faisal Hills | ' . $formattedTitle,
                'h1_heading' => $formattedTitle . ' at Faisal Hills',
                'meta_description' => 'Explore master plan, inventory, payment plan and RDA approval for ' . $formattedTitle . ' at Faisal Hills.',
                'canonical_url' => null,
                'robots_index' => true,
                'robots_follow' => true,
                'keywords' => 'faisal hills, ' . str_replace('-', ' ', $pageSlug),
                'focus_keyword' => 'Faisal Hills ' . $formattedTitle,
                'secondary_keywords' => '',
                'og_title' => 'Faisal Hills | ' . $formattedTitle,
                'og_description' => 'Explore master plan, inventory, payment plan and RDA approval for ' . $formattedTitle . ' at Faisal Hills.',
                'og_image' => null,
                'twitter_title' => null,
                'twitter_description' => null,
                'twitter_image' => null,
                'schema_type' => 'WebPage',
                'custom_schema_json' => null,
            ]);
        }
        
        return response()->json($seo);
    }

    public function update(Request $request, string $pageSlug)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'h1_heading' => 'nullable|string',
            'meta_description' => 'required|string',
            'canonical_url' => 'nullable|string',
            'robots_index' => 'nullable|boolean',
            'robots_follow' => 'nullable|boolean',
            'keywords' => 'nullable|string',
            'focus_keyword' => 'nullable|string',
            'secondary_keywords' => 'nullable|string',
            'og_title' => 'nullable|string',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|string',
            'twitter_title' => 'nullable|string',
            'twitter_description' => 'nullable|string',
            'twitter_image' => 'nullable|string',
            'schema_type' => 'nullable|string',
            'custom_schema_json' => 'nullable|string',
        ]);

        if (!isset($validated['robots_index'])) $validated['robots_index'] = true;
        if (!isset($validated['robots_follow'])) $validated['robots_follow'] = true;

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
            'siteUrl' => 'nullable|string',
            'titleSeparator' => 'nullable|string',
            'defaultMetaTitle' => 'nullable|string',
            'defaultMetaDescription' => 'required|string',
            'defaultKeywords' => 'required|string',
            'defaultOgImage' => 'nullable|string',
            'googleSiteVerification' => 'nullable|string',
            'bingSiteVerification' => 'nullable|string',
            'gtmId' => 'nullable|string',
            'gaMeasurementId' => 'nullable|string',
            'facebookAppId' => 'nullable|string',
            'twitterHandle' => 'nullable|string',
            'organizationName' => 'nullable|string',
            'organizationPhone' => 'nullable|string',
            'organizationEmail' => 'nullable|string',
            'organizationAddress' => 'nullable|string',
            'defaultRobotsIndex' => 'nullable|boolean',
            'defaultRobotsFollow' => 'nullable|boolean',
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

    public function sitemapData()
    {
        // Fetch published blocks, blogs, plots, and configured static pages
        $staticPages = [
            ['url' => '/', 'changefreq' => 'daily', 'priority' => 1.0, 'lastmod' => now()->toIso8601String()],
            ['url' => '/about-us', 'changefreq' => 'monthly', 'priority' => 0.8, 'lastmod' => now()->toIso8601String()],
            ['url' => '/master-plan', 'changefreq' => 'weekly', 'priority' => 0.9, 'lastmod' => now()->toIso8601String()],
            ['url' => '/faisal-hills-payment-plan', 'changefreq' => 'weekly', 'priority' => 0.9, 'lastmod' => now()->toIso8601String()],
            ['url' => '/faisal-hills-blocks', 'changefreq' => 'weekly', 'priority' => 0.9, 'lastmod' => now()->toIso8601String()],
            ['url' => '/faisal-hills-commercial', 'changefreq' => 'weekly', 'priority' => 0.9, 'lastmod' => now()->toIso8601String()],
            ['url' => '/faisal-hills-noc-status', 'changefreq' => 'monthly', 'priority' => 0.8, 'lastmod' => now()->toIso8601String()],
            ['url' => '/faisal-hills-location', 'changefreq' => 'monthly', 'priority' => 0.8, 'lastmod' => now()->toIso8601String()],
            ['url' => '/plots', 'changefreq' => 'daily', 'priority' => 0.9, 'lastmod' => now()->toIso8601String()],
            ['url' => '/blogs', 'changefreq' => 'daily', 'priority' => 0.85, 'lastmod' => now()->toIso8601String()],
            ['url' => '/contact', 'changefreq' => 'monthly', 'priority' => 0.7, 'lastmod' => now()->toIso8601String()],
            ['url' => '/privacy-policy', 'changefreq' => 'yearly', 'priority' => 0.3, 'lastmod' => now()->toIso8601String()],
            ['url' => '/terms-of-service', 'changefreq' => 'yearly', 'priority' => 0.3, 'lastmod' => now()->toIso8601String()],
        ];

        // Exclude pages marked as robots_index: false
        $noindexPages = SeoConfig::where('robots_index', false)->pluck('page_slug')->toArray();

        $routes = collect($staticPages)->reject(function ($page) use ($noindexPages) {
            $slug = trim($page['url'], '/');
            $slug = empty($slug) ? 'home' : $slug;
            return in_array($slug, $noindexPages);
        })->values();

        // Add blocks
        $blocks = Block::all();
        foreach ($blocks as $block) {
            $slug = $block->slug;
            if (!in_array($slug, $noindexPages)) {
                $routes->push([
                    'url' => '/blocks/' . $slug,
                    'changefreq' => 'weekly',
                    'priority' => 0.85,
                    'lastmod' => $block->updated_at ? $block->updated_at->toIso8601String() : now()->toIso8601String()
                ]);
            }
        }

        // Add published blogs
        $blogs = Blog::where('published', true)->where('robots_index', true)->get();
        foreach ($blogs as $blog) {
            $routes->push([
                'url' => '/blogs/' . $blog->slug,
                'changefreq' => 'weekly',
                'priority' => 0.8,
                'lastmod' => $blog->updated_at ? $blog->updated_at->toIso8601String() : now()->toIso8601String()
            ]);
        }

        // Add available featured plots
        $plots = Plot::where('status', 'Available')->where('featured', true)->get();
        foreach ($plots as $plot) {
            $routes->push([
                'url' => '/plots/' . $plot->id,
                'changefreq' => 'weekly',
                'priority' => 0.6,
                'lastmod' => $plot->updated_at ? $plot->updated_at->toIso8601String() : now()->toIso8601String()
            ]);
        }

        return response()->json([
            'routes' => $routes
        ]);
    }
}
