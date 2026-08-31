<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Cache::remember('fh_settings_all', 3600, function () {
            return SiteSetting::all()->pluck('value', 'key');
        });
        return response()->json($settings);
    }

    public function show(string $key)
    {
        $settingValue = Cache::remember("fh_setting_{$key}", 3600, function () use ($key) {
            $setting = SiteSetting::where('key', $key)->first();
            return $setting ? $setting->value : null;
        });

        if ($settingValue === null) {
            return response()->json(['message' => 'Setting not found'], 404);
        }
        return response()->json($settingValue);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string',
            'value' => 'required',
        ]);

        $setting = SiteSetting::updateOrCreate(
            ['key' => $validated['key']],
            ['value' => $validated['value']]
        );

        // If last verified date is updated, sync it with society_stats.lastVerifiedDate
        if ($validated['key'] === 'last_verified_date') {
            $statsSetting = SiteSetting::where('key', 'society_stats')->first();
            if ($statsSetting) {
                $stats = $statsSetting->value;
                $stats['lastVerifiedDate'] = $validated['value'];
                $statsSetting->update(['value' => $stats]);
            }
        }

        Cache::forget('fh_settings_all');
        Cache::forget("fh_setting_{$validated['key']}");

        return response()->json([
            'message' => 'Setting updated successfully',
            'key' => $setting->key,
            'value' => $setting->value
        ]);
    }
}
