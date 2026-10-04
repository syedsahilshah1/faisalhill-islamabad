<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'active_user' => \App\Http\Middleware\EnsureUserIsActive::class,
            'super_admin' => \App\Http\Middleware\SuperAdminMiddleware::class,
            'can' => \App\Http\Middleware\RequirePermission::class,
            'setting.permission' => \App\Http\Middleware\RequireSettingPermission::class,
            'cache.headers' => \App\Http\Middleware\CacheResponseHeaders::class,
        ]);

        // Public GET responses get ETag + Cache-Control + stale-while-revalidate
        // so repeat visits and ISR revalidations are answered without touching
        // the controllers. Applied last so it sees the final response.
        $middleware->api(append: [\App\Http\Middleware\CacheResponseHeaders::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();