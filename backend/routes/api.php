<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\PlotController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RedirectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Authentication
Route::post('/auth/login', [AuthController::class, 'login']);

// Public Blocks
Route::get('/blocks', [BlockController::class, 'index']);
Route::get('/blocks/{slug}', [BlockController::class, 'show']);

// Public Plots
Route::get('/plots', [PlotController::class, 'index']);
Route::get('/plots/{id}', [PlotController::class, 'show']);

// Public Gallery
Route::get('/gallery', [GalleryController::class, 'index']);

// Public Leads Submission
Route::post('/leads', [LeadController::class, 'store']);

// Public Site Settings & SEO
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{key}', [SettingController::class, 'show']);
Route::get('/seo', [SeoController::class, 'index']);
Route::get('/seo/{page_slug}', [SeoController::class, 'show']);
Route::get('/sitemap-routes', [SeoController::class, 'sitemapData']);

// Public Active Redirects (For Next.js dynamic 301 middleware)
Route::get('/redirects/active', [RedirectController::class, 'active']);
Route::post('/redirects/hit', [RedirectController::class, 'incrementHit']);

// Public Blogs
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);

// Protected Routes (Admin Only)
Route::middleware('auth:sanctum')->group(function () {
    // Auth Protected
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    
    // Blocks Admin
    Route::put('/blocks/{id}', [BlockController::class, 'update']);
    
    // Plots Admin
    Route::post('/plots', [PlotController::class, 'store']);
    Route::put('/plots/{id}', [PlotController::class, 'update']);
    Route::delete('/plots/{id}', [PlotController::class, 'destroy']);
    
    // Leads Admin
    Route::get('/leads', [LeadController::class, 'index']);
    Route::delete('/leads/{id}', [LeadController::class, 'destroy']);
    
    // Gallery Admin
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
    
    // Settings Admin
    Route::put('/settings', [SettingController::class, 'update']);
    
    // SEO Admin
    Route::put('/seo/global', [SeoController::class, 'updateGlobal']);
    Route::put('/seo/{page_slug}', [SeoController::class, 'update']);

    // Redirects Admin
    Route::get('/redirects', [RedirectController::class, 'index']);
    Route::post('/redirects', [RedirectController::class, 'store']);
    Route::put('/redirects/{id}', [RedirectController::class, 'update']);
    Route::delete('/redirects/{id}', [RedirectController::class, 'destroy']);

    // Blogs Admin
    Route::get('/admin/blogs', [BlogController::class, 'adminIndex']);
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
});
