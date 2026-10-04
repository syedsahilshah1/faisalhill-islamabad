<?php

namespace App\Http\Middleware;

use App\Support\PermissionRegistry;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Enforces a dashboard permission on a route.
 *
 * Applied as `can:manage_plots` (or `can:manage_plots,manage_blocks` to require
 * several). This is the check that was missing entirely: the `permissions`
 * column was populated by the admin UI but no code ever consulted it, so any
 * authenticated administrator could reach every CMS and record endpoint
 * regardless of what a superadmin had granted them.
 *
 * Fails closed. An account with no permissions gets no access, which is the
 * whole point of granting access per user.
 */
class RequirePermission
{
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // A super administrator is not restricted by the grants UI, which cannot
        // otherwise reach the users screen to change its own permissions.
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        if ($permissions === []) {
            // `can:` with no arguments would be a route configuration mistake.
            // Deny rather than silently allow.
            return response()->json(['message' => 'No permission specified for this route.'], 403);
        }

        foreach ($permissions as $permission) {
            if ($user->hasPermission($permission)) {
                return $next($request);
            }
        }

        return response()->json([
            'message' => 'You do not have permission to perform this action.',
            'required_any_of' => array_values($permissions),
        ], 403);
    }

    /**
     * Exposed for the admin UI so the permission picker can never drift from
     * what the server will actually accept.
     */
    public static function catalogue(): array
    {
        return PermissionRegistry::forApi();
    }
}