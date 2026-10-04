<?php

namespace App\Providers;

use App\Models\Blog;
use App\Models\Block;
use App\Models\GalleryItem;
use App\Models\Plot;
use App\Models\SeoConfig;
use App\Models\SiteSetting;
use App\Support\DerivedCacheRegistry;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureModels();
        $this->configureRateLimiters();
        $this->observeModelChanges();
    }

    /**
     * Guard against N+1 queries and lazy loading in development, and disable
     * attribute access logging overhead in production.
     */
    private function configureModels(): void
    {
        Model::preventLazyLoading(false);
        Model::preventSilentlyDiscardingAttributes(false);

        if (app()->isLocal()) {
            Model::preventLazyLoading(true);
        }
    }

    /**
     * Central rate limiting definitions.
     *
     * Every limiter is keyed on the authenticated user when one is present and
     * falls back to the client IP for anonymous traffic, so a shared NAT or a
     * single abusive host cannot exhaust an entire block's quota.
     */
    private function configureRateLimiters(): void
    {
        // Baseline guard applied to the whole /api surface.
        RateLimiter::for('api', function (Request $request) {
            return [
                Limit::perMinute(90)->by('api:'.$this->actorKey($request)),
                Limit::perHour(3000)->by('api-hour:'.$this->actorKey($request)),
            ];
        });

        // Public, cacheable GET endpoints (plots, blocks, gallery, seo, settings).
        RateLimiter::for('public-read', function (Request $request) {
            return [
                Limit::perMinute(180)->by('read:'.$this->actorKey($request)),
                Limit::perMinute(600)->by('read-ip:'.$request->ip()),
                Limit::perHour(6000)->by('read-hour:'.$this->actorKey($request)),
            ];
        });

        // Anonymous writes: leads, redirect hit counters.
        RateLimiter::for('public-write', function (Request $request) {
            return [
                Limit::perMinute(20)->by('write:'.$this->actorKey($request)),
                Limit::perHour(300)->by('write-hour:'.$this->actorKey($request)),
            ];
        });

        // Lead submission triggers an outbound email, so it is the tightest limiter.
        RateLimiter::for('leads', function (Request $request) {
            $ip = $request->ip();

            return [
                Limit::perMinute(5)->by('lead-min:'.$ip),
                Limit::perHour(20)->by('lead-hour:'.$ip),
                Limit::perDay(60)->by('lead-day:'.$ip),
            ];
        });

        // Login / password recovery, keyed per credential so one attacker cannot
        // lock out every account from the same IP and vice versa.
        RateLimiter::for('auth', function (Request $request) {
            $identifier = Str::lower((string) ($request->input('username') ?: $request->input('email')));

            return [
                Limit::perMinute(15)->by('auth:'.$identifier.'|'.$request->ip()),
                Limit::perHour(60)->by('auth-hour:'.$identifier.'|'.$request->ip()),
            ];
        });

        // Authenticated dashboard reads.
        RateLimiter::for('admin-read', function (Request $request) {
            return [
                Limit::perMinute(120)->by('admin-read:'.$this->actorKey($request)),
            ];
        });

        // Authenticated dashboard writes.
        RateLimiter::for('admin-write', function (Request $request) {
            return [
                Limit::perMinute(120)->by('admin-write:'.$this->actorKey($request)),
                Limit::perHour(3000)->by('admin-write-hour:'.$this->actorKey($request)),
            ];
        });
    }

/**
 * Invalidate the read-through caches from the model layer so any write path —
 * controller, seeder, tinker, console command or queued job — busts the cache.
 *
 * Controllers still flush their own keys explicitly; this is the safety net
 * against a write path that forgets. It runs in console and in tests too,
 * because a stale cache after a re-seed is a worse failure than the handful of
 * extra cache reads a bulk insert costs.
 */
private function observeModelChanges(): void
    {
        $flushes = [
            Plot::class => fn () => (new DerivedCacheRegistry('fh_plots_registry', 250, 300))->flush('fh_plots_all'),
            Block::class => fn () => cache()->forget('fh_blocks_all'),
            GalleryItem::class => fn () => cache()->forget('fh_gallery_all'),
            Blog::class => fn () => cache()->forget('fh_seo_all'),
            SeoConfig::class => fn () => cache()->forget('fh_seo_all'),
        ];

        foreach ($flushes as $model => $flush) {
            $model::saved($flush);
            $model::deleted($flush);
        }

        SiteSetting::saved(fn (SiteSetting $setting) => $this->forgetSettings($setting->key));
        SiteSetting::deleted(fn (SiteSetting $setting) => $this->forgetSettings($setting->key));
    }

    /**
     * Setting writes fan out to several keys: the aggregate list, the single
     * key lookup, and any other setting that embeds the mutated value.
     */
    private function forgetSettings(?string $key): void
    {
        cache()->forget('fh_settings_all');

        if (! $key) {
            return;
        }

        cache()->forget('fh_setting_'.$key);

        // last_verified_date is mirrored into society_stats, so both keys and the
        // aggregate list have to go.
        if ($key === 'last_verified_date') {
            cache()->forget('fh_setting_society_stats');
        }
    }

    private function actorKey(Request $request): string
    {
        $user = $request->user();

        return $user?->getAuthIdentifier() !== null
            ? 'u'.$user->getAuthIdentifier()
            : 'ip:'.$request->ip();
    }
}