<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    private const CACHE_ALL = 'fh_settings_all';

    private const CACHE_KEY_PREFIX = 'fh_setting_';

    private const CACHE_TTL = 3600;

    public function index()
    {
        $settings = Cache::remember(self::CACHE_ALL, self::CACHE_TTL, function () {
            return SiteSetting::all()->pluck('value', 'key');
        });
        return response()->json($settings);
    }

    public function show(string $key)
    {
        $settingValue = Cache::remember(self::CACHE_KEY_PREFIX.$key, self::CACHE_TTL, function () use ($key) {
            $setting = SiteSetting::where('key', $key)->first();
            return $setting ? $setting->value : null;
        });

        if ($settingValue === null) {
            return response()->json(null, 200);
        }
        return response()->json($settingValue);
    }

    public function update(Request $request, ?string $key = null)
    {
        $settingKey = $key ?? $request->input('key');
        if (!$settingKey) {
            return response()->json(['message' => 'Setting key is required'], 422);
        }

        $value = $request->has('value') ? $request->input('value') : $request->all();

        $setting = SiteSetting::updateOrCreate(
            ['key' => $settingKey],
            ['value' => $value]
        );

        // If last verified date is updated, sync it with society_stats.lastVerifiedDate
        $touched = [$settingKey];

        if ($settingKey === 'last_verified_date') {
            $statsSetting = SiteSetting::where('key', 'society_stats')->first();
            if ($statsSetting) {
                $stats = $statsSetting->value;
                $stats['lastVerifiedDate'] = is_string($value) ? $value : ($value['lastVerifiedDate'] ?? '');
                $statsSetting->update(['value' => $stats]);
                $touched[] = 'society_stats';
            }
        }

        $this->forgetKeys(...$touched);

        return response()->json([
            'message' => 'Setting updated successfully',
            'key' => $setting->key,
            'value' => $setting->value
        ]);
    }

    /**
     * Forget the aggregate list plus every key a write can have touched.
     *
     * Writing `last_verified_date` also rewrites `society_stats`, so clearing
     * only the written key used to leave the homepage serving a stale verified
     * date until the hour-long TTL expired.
     */
    private function forgetKeys(string ...$keys): void
    {
        Cache::forget(self::CACHE_ALL);

        foreach ($keys as $key) {
            Cache::forget(self::CACHE_KEY_PREFIX.$key);
        }
    }
}
