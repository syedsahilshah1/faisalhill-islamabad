<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminUserController;
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

// Public Authentication & Password Recovery
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

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

// Protected Routes (Authenticated & Active Administrators)
Route::middleware(['auth:sanctum', 'active_user'])->group(function () {
    // Auth Protected (Self Management)
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/password', [AuthController::class, 'changePassword']);
    
    // Super Admin Exclusive Management
    Route::middleware('super_admin')->group(function () {
        Route::get('/admin/users', [AdminUserController::class, 'index']);
        Route::post('/admin/users', [AdminUserController::class, 'store']);
        Route::put('/admin/users/{id}', [AdminUserController::class, 'update']);
        Route::patch('/admin/users/{id}/status', [AdminUserController::class, 'toggleStatus']);
        Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy']);
    });
    
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
