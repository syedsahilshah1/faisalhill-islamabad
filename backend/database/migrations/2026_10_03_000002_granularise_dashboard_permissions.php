<?php

use App\Support\PermissionRegistry;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Granularises the dashboard permissions.
 *
 * Background: `users.permissions` already existed, but nothing enforced it and
 * the only key it could meaningfully hold for CMS work was the coarse
 * `manage_homepage_cms`. Enforcement now fails closed, so an account left with a
 * null or empty permission array would silently lose all dashboard access the
 * moment the new checks went live.
 *
 * This migration therefore does two things, in order:
 *
 *  1. Translates any legacy coarse key into its granular equivalents, so an
 *     account that had `manage_homepage_cms` keeps every area that key used to
 *     cover.
 *  2. Grants any remaining account without permissions the full set except
 *     `manage_users`. Those accounts previously reached every CMS and record
 *     endpoint, so this preserves their access exactly rather than locking an
 *     existing administrator out of the site mid-deployment.
 *
 * New accounts are created through the API, which always writes an explicit
 * list, so the grant-everything fallback never applies to them.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('users') || ! Schema::hasColumn('users', 'permissions')) {
            return;
        }

        $defaultGrant = PermissionRegistry::legacyDefaultGrant();
        $superAdminGrant = PermissionRegistry::all();

        DB::table('users')->orderBy('id')->chunk(200, function ($users) use ($defaultGrant, $superAdminGrant) {
            foreach ($users as $user) {
                $stored = $user->permissions === null ? null : json_decode($user->permissions, true);

                $grant = $user->role === 'super_admin'
                    ? $superAdminGrant
                    : ($stored === null ? $defaultGrant : PermissionRegistry::sanitize($stored));

                // Re-running the migration must not shrink an existing grant.
                if ($stored !== null && ! array_diff($grant, PermissionRegistry::sanitize($stored))) {
                    continue;
                }

                DB::table('users')->where('id', $user->id)->update([
                    'permissions' => json_encode(array_values($grant)),
                ]);
            }
        });
    }

    public function down(): void
    {
        // Grants are only ever widened by this migration, and the coarse keys it
        // replaces are still honoured by PermissionRegistry::sanitize(), so
        // there is nothing meaningful to roll back. Reverting would instead
        // leave accounts holding permissions the pre-migration code ignores.
    }
};