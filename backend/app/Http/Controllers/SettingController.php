<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function show(string $key)
    {
        $setting = SiteSetting::where('key', $key)->first();
        if (!$setting) {
            return response()->json(['message' => 'Setting not found'], 404);
        }
        return response()->json($setting->value);
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

        return response()->json([
            'message' => 'Setting updated successfully',
            'key' => $setting->key,
            'value' => $setting->value
        ]);
    }
}
