<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\PlotController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RedirectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Rate limiting notes:
|   throttle:auth        credential + IP keyed, protects the token endpoints
|   throttle:public-read generous cap for cached anonymous GET traffic
|   throttle:public-write cap for anonymous writes
|   throttle:leads       tight cap, every submission sends an outbound email
|   throttle:admin-read  authenticated dashboard reads
|   throttle:admin-write authenticated dashboard writes
|
| Limiters are defined in App\Providers\AppServiceProvider::configureRateLimiting().
|
*/

// Public Authentication & Password Recovery
Route::middleware('throttle:auth')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
});

// Public, cacheable reads
Route::middleware('throttle:public-read')->group(function () {
    // Blocks
    Route::get('/blocks', [BlockController::class, 'index']);
    Route::get('/blocks/{slug}', [BlockController::class, 'show']);

    // Plots
    Route::get('/plots', [PlotController::class, 'index']);
    Route::get('/plots/{id}', [PlotController::class, 'show']);

    // Gallery
    Route::get('/gallery', [GalleryController::class, 'index']);

    // Site Settings & SEO
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/settings/{key}', [SettingController::class, 'show']);
    Route::get('/seo', [SeoController::class, 'index']);
    Route::get('/seo/{page_slug}', [SeoController::class, 'show']);
    Route::get('/sitemap-routes', [SeoController::class, 'sitemapData']);

    // Public Active Redirects (For Next.js dynamic 301 middleware)
    Route::get('/redirects/active', [RedirectController::class, 'active']);

    // Blogs
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
});

// Public Leads Submission — tightest limiter because each hit sends email.
Route::post('/leads', [LeadController::class, 'store'])->middleware('throttle:leads');

// Public hit counter, called by Next.js middleware on every request. Cap it so
// the write cannot be used to amplify database load.
Route::post('/redirects/hit', [RedirectController::class, 'incrementHit'])
    ->middleware('throttle:public-write');

// Protected Routes (Authenticated & Active Administrators)
//
// Exactly one throttle limiter runs per route: nesting two would burn two cache
// lookups per request and double-count a single action against two budgets.
//
// Every route also declares the permission it needs via `can:`. This is the
// only place authorization is decided; the `permissions` column on the user
// record is what a superadmin grants, and `RequirePermission` fails closed when
// nothing has been granted. Settings keys are resolved per key inside the route
// because all CMS content shares one endpoint.
Route::middleware(['auth:sanctum', 'active_user'])->group(function () {
    // Auth Protected (Self Management)
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('throttle:admin-write');
    Route::get('/auth/user', [AuthController::class, 'user'])->middleware('throttle:admin-read');
    Route::put('/auth/password', [AuthController::class, 'changePassword'])->middleware('throttle:admin-write');

    // Administrators and permissions. A superadmin bypasses `can:`, but the
    // permission is still required so a granted-but-not-superadmin account gets
    // a meaningful 403 rather than relying on the role check alone.
    Route::middleware(['throttle:admin-read', 'can:manage_users'])->group(function () {
        Route::get('/admin/users', [AdminUserController::class, 'index']);
        Route::get('/admin/permissions', [AdminUserController::class, 'permissions']);
    });

    Route::middleware(['throttle:admin-write', 'can:manage_users'])->group(function () {
        Route::post('/admin/users', [AdminUserController::class, 'store']);
        Route::put('/admin/users/{id}', [AdminUserController::class, 'update']);
        Route::patch('/admin/users/{id}/status', [AdminUserController::class, 'toggleStatus']);
        Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy']);
    });

    // Block records
    Route::put('/blocks/{id}', [BlockController::class, 'update'])
        ->middleware(['throttle:admin-write', 'can:manage_blocks']);

    // Plots Admin
    Route::post('/plots', [PlotController::class, 'store'])->middleware(['throttle:admin-write', 'can:manage_plots']);
    Route::put('/plots/{id}', [PlotController::class, 'update'])->middleware(['throttle:admin-write', 'can:manage_plots']);
    Route::delete('/plots/{id}', [PlotController::class, 'destroy'])->middleware(['throttle:admin-write', 'can:manage_plots']);

    // Leads Admin
    Route::get('/leads', [LeadController::class, 'index'])->middleware(['throttle:admin-read', 'can:manage_leads']);
    Route::delete('/leads/{id}', [LeadController::class, 'destroy'])->middleware(['throttle:admin-write', 'can:manage_leads']);

    // Gallery Admin
    Route::post('/gallery', [GalleryController::class, 'store'])->middleware(['throttle:admin-write', 'can:manage_gallery']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy'])->middleware(['throttle:admin-write', 'can:manage_gallery']);
    Route::post('/gallery/upload', [GalleryController::class, 'upload'])
        ->middleware(['throttle:admin-write', 'can:manage_gallery']);

    // Site Settings (CMS). The permission is resolved from the key being
    // written, so access can be granted per page instead of site-wide.
    Route::match(['post', 'put'], '/settings/{key}', [SettingController::class, 'update'])
        ->middleware(['throttle:admin-write', 'setting.permission']);
    Route::put('/settings', [SettingController::class, 'update'])
        ->middleware(['throttle:admin-write', 'setting.permission']);

    // Image uploads.
    //
    // Gated on `any of` the content-editing capabilities rather than a single
    // one: an uploaded file is only useful to an administrator who can attach it
    // to a page, and every content area needs to be able to. `RequirePermission`
    // already treats a multi-value `can:` as "any of".
    //
    // The gallery keeps its own route because that editor historically posted to
    // `/gallery/upload`.
    Route::post('/admin/media/upload', [MediaController::class, 'store'])
        ->middleware([
            'throttle:admin-write',
            'can:'.implode(',', [
                'manage_homepage',
                'manage_blocks_page',
                'manage_master_plan',
                'manage_payment_plan',
                'manage_noc_status',
                'manage_about_page',
                'manage_contact_page',
                'manage_location_page',
                'manage_commercial_page',
                'manage_gallery_page',
                'manage_gallery',
                'manage_blogs',
                'manage_seo',
                'manage_plots',
                'manage_blocks',
                'manage_plot_series',
            ]),
        ]);

    // SEO Admin
    Route::put('/seo/global', [SeoController::class, 'updateGlobal'])->middleware(['throttle:admin-write', 'can:manage_seo']);
    Route::put('/seo/{page_slug}', [SeoController::class, 'update'])->middleware(['throttle:admin-write', 'can:manage_seo']);

    // Redirects Admin
    Route::get('/redirects', [RedirectController::class, 'index'])->middleware(['throttle:admin-read', 'can:manage_redirects']);
    Route::post('/redirects', [RedirectController::class, 'store'])->middleware(['throttle:admin-write', 'can:manage_redirects']);
    Route::put('/redirects/{id}', [RedirectController::class, 'update'])->middleware(['throttle:admin-write', 'can:manage_redirects']);
    Route::delete('/redirects/{id}', [RedirectController::class, 'destroy'])->middleware(['throttle:admin-write', 'can:manage_redirects']);

    // Blogs Admin
    Route::get('/admin/blogs', [BlogController::class, 'adminIndex'])->middleware(['throttle:admin-read', 'can:manage_blogs']);
    Route::post('/blogs', [BlogController::class, 'store'])->middleware(['throttle:admin-write', 'can:manage_blogs']);
    Route::put('/blogs/{id}', [BlogController::class, 'update'])->middleware(['throttle:admin-write', 'can:manage_blogs']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->middleware(['throttle:admin-write', 'can:manage_blogs']);
});