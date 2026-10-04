<?php

namespace App\Http\Middleware;

use App\Support\PermissionRegistry;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Guards `PUT /api/settings/{key}`.
 *
 * Every CMS key in the project shares one route, so the required permission
 * cannot live in routes/api.php — it is resolved from the key being written.
 * Without this, a single `settings` route was a single permission for the whole
 * site: an editor granted one CMS area could rewrite every other page.
 */
class RequireSettingPermission
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // The key can arrive as a route parameter or in the body, depending on
        // which write endpoint the caller used.
        $key = $request->route('key') ?? $request->input('key');

        if (! is_string($key) || $key === '') {
            return response()->json(['message' => 'Setting key is required'], 422);
        }

        $permission = PermissionRegistry::permissionForSettingKey($key);

        if ($permission === null) {
            // Unknown key: no owner has been decided for this content, so no
            // non-super administrator may write it.
            return response()->json([
                'message' => 'This setting is not assignable by an administrator account.',
                'key' => $key,
            ], 403);
        }

        if (! $user->hasPermission($permission)) {
            return response()->json([
                'message' => 'You do not have permission to edit this content.',
                'key' => $key,
                'required_any_of' => [$permission],
            ], 403);
        }

        return $next($request);
    }
}