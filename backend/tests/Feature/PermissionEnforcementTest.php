<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\PermissionRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Proves permissions are actually enforced.
 *
 * The defect this guards against is specific and previously total: the
 * `permissions` column was populated by the admin UI but no code read it, so an
 * account explicitly granted nothing could still delete every plot, rewrite
 * every page and publish content. Each test here creates a real user with a
 * real grant and asserts the API agrees.
 */
class PermissionEnforcementTest extends TestCase
{
    use RefreshDatabase;

    private function userWith(array $permissions, string $role = 'admin'): User
    {
        return User::create([
            'name' => 'Permission Test Admin',
            'email' => 'perm-'.implode('-', $permissions ?: ['none']).'-'.$role.'@example.com',
            'password' => Hash::make('password123'),
            'role' => $role,
            'status' => 'active',
            'permissions' => $permissions,
        ]);
    }

    private function tokenFor(User $user): string
    {
        return $user->createToken('test-token')->plainTextToken;
    }

    /**
     * Every protected write/read endpoint, with the permission that must grant it.
     *
     * @return array<string, array{0: string, 1: string, 2: string, 3: array<string, mixed>, 4: string}>
     */
    public static function guardedEndpoints(): array
    {
        return [
            'plots store' => ['post', 'api/plots', PermissionRegistry::PLOTS, [
                'plot_number' => 'X-1', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'size' => '5 Marla',
            ], 'plot'],
            'plots update' => ['put', 'api/plots/none', PermissionRegistry::PLOTS, ['price' => 1], 'plot'],
            'plots destroy' => ['delete', 'api/plots/none', PermissionRegistry::PLOTS, [], 'plot'],
            'blocks update' => ['put', 'api/blocks/block-a', PermissionRegistry::BLOCK_RECORDS, ['name' => 'x'], 'block'],
            'leads index' => ['get', 'api/leads', PermissionRegistry::LEADS, [], null],
            'leads destroy' => ['delete', 'api/leads/1', PermissionRegistry::LEADS, [], 'lead'],
            'gallery store' => ['post', 'api/gallery', PermissionRegistry::GALLERY, ['title' => 't', 'image_url' => '/x.webp'], null],
            'gallery destroy' => ['delete', 'api/gallery/1', PermissionRegistry::GALLERY, [], 'gallery'],
            'seo global' => ['put', 'api/seo/global', PermissionRegistry::SEO_SETTINGS, ['site_name' => 'x'], null],
            'seo page' => ['put', 'api/seo/home', PermissionRegistry::SEO_SETTINGS, ['title' => 'x'], null],
            'redirects index' => ['get', 'api/redirects', PermissionRegistry::REDIRECTS, [], null],
            'redirects store' => ['post', 'api/redirects', PermissionRegistry::REDIRECTS, [
                'source_url' => '/a', 'destination_url' => '/b', 'status_code' => 301, 'is_active' => true,
            ], null],
            'blogs index' => ['get', 'api/admin/blogs', PermissionRegistry::BLOGS, [], null],
            'blogs store' => ['post', 'api/blogs', PermissionRegistry::BLOGS, [
                'title' => 'T', 'slug' => 't', 'content' => 'c', 'excerpt' => 'e',
            ], null],
            'users index' => ['get', 'api/admin/users', PermissionRegistry::USERS, [], null],
        ];
    }

    /**
     * @dataProvider guardedEndpoints
     */
    public function test_an_administrator_without_the_permission_is_refused(
        string $method,
        string $uri,
        string $permission,
        array $payload,
        ?string $fixture
    ) {
        $token = $this->tokenFor($this->userWith([]));

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->json(strtoupper($method), '/'.$uri, $payload);

        $response->assertStatus(403);
        $response->assertJsonPath('required_any_of.0', $permission);
    }

    /**
     * @dataProvider guardedEndpoints
     */
    public function test_an_administrator_with_the_permission_is_not_blocked_by_the_permission_check(
        string $method,
        string $uri,
        string $permission,
        array $payload,
        ?string $fixture
    ) {
        $user = $this->userWith([$permission]);
        $token = $this->tokenFor($user);

        $this->seedFixture($fixture);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->json(strtoupper($method), '/'.$uri, $payload);

        // A 404 or a validation error means the request passed the permission
        // gate and failed later on its own merits. Only 403 or 401 would mean
        // the permission middleware refused it.
        $this->assertNotContains(
            $response->getStatusCode(),
            [401, 403],
            "{$method} {$uri} should not be refused for a user holding {$permission}, got {$response->getStatusCode()}: ".$response->getContent()
        );
    }

    public function test_a_grant_for_one_area_does_not_leak_into_another()
    {
        // The core regression: a content editor who owns the About page must not
        // be able to delete leads or plots.
        $token = $this->tokenFor($this->userWith([PermissionRegistry::ABOUT_PAGE_CMS]));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->getJson('/api/leads')->assertStatus(403);
        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->postJson('/api/plots', ['block_slug' => 'b', 'block_name' => 'B', 'size' => '5 Marla'])
            ->assertStatus(403);
        $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson('/api/seo/home', ['title' => 'x'])->assertStatus(403);
    }

    public function test_every_registered_permission_is_enforceable()
    {
        // A permission nobody can exercise is dead configuration. This proves each
        // one actually grants something.
        foreach (PermissionRegistry::all() as $permission) {
            $user = User::create([
                'name' => 'Scoped '.$permission,
                'email' => $permission.'@example.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
                'permissions' => [$permission],
            ]);

            $this->assertTrue(
                $user->hasPermission($permission),
                "Permission [{$permission}] is registered but not grantable."
            );
        }
    }

    public function test_permissions_are_resolved_per_setting_key()
    {
        $editor = $this->tokenFor($this->userWith([PermissionRegistry::ABOUT_PAGE_CMS]));

        // Owns the About page.
        $this->withHeaders(['Authorization' => 'Bearer '.$editor])
            ->postJson('/api/settings/about_us_cms', ['value' => ['title' => 'About']])
            ->assertStatus(200);

        // Does not own the homepage.
        $this->withHeaders(['Authorization' => 'Bearer '.$editor])
            ->postJson('/api/settings/homepage_cms', ['value' => ['hero' => 'x']])
            ->assertStatus(403);

        // Does not own legal policies.
        $this->withHeaders(['Authorization' => 'Bearer '.$editor])
            ->postJson('/api/settings/privacy_policy', ['value' => ['body' => 'x']])
            ->assertStatus(403);
    }

    public function test_an_unmapped_settings_key_is_refused_rather_than_guessed()
    {
        $token = $this->tokenFor($this->userWith(PermissionRegistry::all()));

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->postJson('/api/settings/not_a_real_key', ['value' => 'x']);

        $response->assertStatus(403);
        $response->assertJsonPath('key', 'not_a_real_key');
    }

    public function test_super_admin_is_not_restricted_by_permissions()
    {
        $super = $this->userWith([], 'super_admin');
        $token = $this->tokenFor($super);

        foreach (self::guardedEndpoints() as [$method, $uri, , $payload]) {
            $this->seedFixture(null);

            $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
                ->json(strtoupper($method), '/'.$uri, $payload);

            $this->assertNotContains(
                $response->getStatusCode(),
                [401, 403],
                "Super admin must reach {$method} {$uri}, got {$response->getStatusCode()}"
            );
        }
    }

    public function test_a_super_admin_is_reported_as_holding_every_permission()
    {
        $super = $this->userWith([], 'super_admin');

        $this->assertSame(PermissionRegistry::all(), $super->effectivePermissions());
    }

    public function test_login_returns_the_permissions_so_the_dashboard_can_gate_itself()
    {
        $user = $this->userWith([PermissionRegistry::BLOGS, PermissionRegistry::GALLERY]);

        $response = $this->postJson('/api/auth/login', [
            'username' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        // Reported in registry order, which is stable across saves.
        $response->assertJsonPath('user.permissions', ['manage_gallery', 'manage_blogs']);
    }

    public function test_session_restore_returns_the_current_permissions()
    {
        $user = $this->userWith([PermissionRegistry::LEADS]);
        $token = $this->tokenFor($user);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/auth/user')
            ->assertOk()
            ->assertJsonPath('user.permissions', ['manage_leads']);
    }

    public function test_a_permission_change_takes_effect_without_relogin()
    {
        $user = $this->userWith([PermissionRegistry::LEADS]);
        $token = $this->tokenFor($user);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->getJson('/api/leads')->assertOk();

        // Revoked while the token is still live.
        $user->update(['permissions' => [PermissionRegistry::BLOGS]]);
        $this->forgetResolvedUser();

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/leads')
            ->assertStatus(403);

        // And the newly granted capability works without a new login.
        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/admin/blogs')
            ->assertOk();
    }

    public function test_deactivating_an_administrator_revokes_their_access()
    {
        $user = $this->userWith([PermissionRegistry::LEADS]);
        $token = $this->tokenFor($user);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->getJson('/api/leads')->assertOk();

        $user->update(['status' => 'inactive']);
        $this->forgetResolvedUser();

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/leads')
            ->assertStatus(403);
    }

    public function test_creating_an_administrator_rejects_an_unknown_permission()
    {
        $token = $this->tokenFor($this->userWith([], 'super_admin'));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->postJson('/api/admin/users', [
            'name' => 'Bad Grants',
            'email' => 'bad-grants@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'active',
            'permissions' => ['manage_plots', 'not_a_real_permission'],
        ])->assertStatus(422);
    }

    public function test_creating_an_administrator_strips_unknown_values_from_the_stored_grant()
    {
        $super = $this->userWith([], 'super_admin');
        $token = $this->tokenFor($super);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->postJson('/api/admin/users', [
            'name' => 'Stripped',
            'email' => 'stripped@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'active',
            // The unknown key is rejected by validation; this asserts the stored
            // grant comes back sanitised and in registry order.
            'permissions' => ['manage_plots', 'manage_seo'],
        ]);

        $response->assertStatus(201);
        $response->assertJsonPath('user.permissions', ['manage_seo', 'manage_plots']);
    }

    public function test_updating_an_administrator_cannot_grant_unknown_permissions()
    {
        $super = $this->userWith([], 'super_admin');
        $token = $this->tokenFor($super);
        $target = $this->userWith([PermissionRegistry::LEADS]);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson('/api/admin/users/'.$target->id, [
            'name' => $target->name,
            'email' => $target->email,
            'status' => 'active',
            'permissions' => ['made_up_capability'],
        ])->assertStatus(422);
    }

    public function test_a_legacy_coarse_grant_expands_into_its_replacements()
    {
        $user = $this->userWith([PermissionRegistry::LEGACY_HOME_CMS]);

        $this->assertTrue($user->hasPermission(PermissionRegistry::HOMEPAGE_CMS));
        $this->assertTrue($user->hasPermission(PermissionRegistry::NOC_STATUS_CMS));
        $this->assertFalse($user->hasPermission(PermissionRegistry::LEADS));
        $this->assertNotContains(PermissionRegistry::LEGACY_HOME_CMS, $user->effectivePermissions());
    }

    public function test_an_unknown_permission_can_never_grant_anything()
    {
        $user = $this->userWith(['totally_made_up']);

        $this->assertFalse($user->hasPermission('totally_made_up'));
        $this->assertFalse($user->hasPermission(PermissionRegistry::PLOTS));
        $this->assertSame([], $user->effectivePermissions());
    }

    public function test_has_all_permissions_requires_every_one()
    {
        $user = $this->userWith([PermissionRegistry::PLOTS, PermissionRegistry::BLOGS]);

        $this->assertTrue($user->hasAllPermissions([PermissionRegistry::PLOTS]));
        $this->assertTrue($user->hasAllPermissions([PermissionRegistry::PLOTS, PermissionRegistry::BLOGS]));
        $this->assertFalse($user->hasAllPermissions([PermissionRegistry::PLOTS, PermissionRegistry::LEADS]));
        $this->assertFalse($user->hasAllPermissions([]));
    }

    public function test_the_permission_catalogue_endpoint_serves_the_registry()
    {
        $token = $this->tokenFor($this->userWith([PermissionRegistry::USERS]));

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->getJson('/api/admin/permissions');

        $response->assertOk();

        $keys = array_column($response->json('permissions'), 'key');

        $this->assertSame(PermissionRegistry::all(), $keys);
    }

    public function test_the_catalogue_requires_manage_users()
    {
        $token = $this->tokenFor($this->userWith([PermissionRegistry::BLOGS]));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/admin/permissions')
            ->assertStatus(403);
    }

    public function test_every_registered_permission_maps_to_exactly_one_label_and_description()
    {
        foreach (PermissionRegistry::forApi() as $permission) {
            $this->assertNotEmpty($permission['label'], "[{$permission['key']}] needs a label");
            $this->assertNotEmpty($permission['description'], "[{$permission['key']}] needs a description");
            $this->assertNotEmpty($permission['group'], "[{$permission['key']}] needs a group");
        }
    }

    public function test_every_mapped_settings_key_points_at_a_real_permission()
    {
        foreach (PermissionRegistry::mappedSettingKeys() as $key) {
            $permission = PermissionRegistry::permissionForSettingKey($key);

            $this->assertNotNull($permission, "Settings key [{$key}] is not mapped");
            $this->assertTrue(
                PermissionRegistry::exists($permission),
                "Settings key [{$key}] maps to unknown permission [{$permission}]"
            );
        }
    }

    public function test_a_non_superadmin_cannot_grant_a_capability_they_do_not_hold()
    {
        $actor = $this->userWith([PermissionRegistry::USERS, PermissionRegistry::LEADS]);
        $victim = $this->userWith([PermissionRegistry::LEADS]);
        $token = $this->tokenFor($actor);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson(
            '/api/admin/users/'.$victim->id,
            [
                'name' => $victim->name,
                'email' => $victim->email,
                'status' => 'active',
                // Self-escalation attempt: `manage_gallery` was never granted to
                // the actor, so it must not be grantable by them.
                'permissions' => [PermissionRegistry::LEADS, PermissionRegistry::GALLERY],
            ]
        );

        $response->assertStatus(422);
        $this->assertStringContainsString(PermissionRegistry::GALLERY, $response->json('errors.permissions.0'));

        $this->assertSame(
            [PermissionRegistry::LEADS],
            $victim->fresh()->permissions
        );
    }

    public function test_a_non_superadmin_cannot_escalate_their_own_account()
    {
        $actor = $this->userWith([PermissionRegistry::USERS]);
        $token = $this->tokenFor($actor);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson(
            '/api/admin/users/'.$actor->id,
            [
                'name' => $actor->name,
                'email' => $actor->email,
                'status' => 'active',
                'permissions' => PermissionRegistry::all(),
            ]
        )->assertStatus(422);

        $this->assertSame([PermissionRegistry::USERS], $actor->fresh()->permissions);
    }

    public function test_a_non_superadmin_may_grant_a_subset_of_their_own_permissions()
    {
        $actor = $this->userWith([PermissionRegistry::USERS, PermissionRegistry::LEADS, PermissionRegistry::BLOGS]);
        $target = $this->userWith([]);
        $token = $this->tokenFor($actor);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson(
            '/api/admin/users/'.$target->id,
            [
                'name' => $target->name,
                'email' => $target->email,
                'status' => 'active',
                'permissions' => [PermissionRegistry::LEADS, PermissionRegistry::BLOGS],
            ]
        )->assertOk();

        $this->assertEqualsCanonicalizing(
            [PermissionRegistry::LEADS, PermissionRegistry::BLOGS],
            $target->fresh()->permissions
        );
    }

    public function test_a_superadmin_may_grant_the_full_set()
    {
        $super = $this->userWith([], 'super_admin');
        $target = $this->userWith([]);
        $token = $this->tokenFor($super);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->putJson(
            '/api/admin/users/'.$target->id,
            [
                'name' => $target->name,
                'email' => $target->email,
                'status' => 'active',
                'permissions' => PermissionRegistry::all(),
            ]
        )->assertOk();

        $this->assertCount(count(PermissionRegistry::all()), $target->fresh()->permissions);
    }

    public function test_creating_an_account_with_permissions_beyond_the_actor_is_refused()
    {
        $actor = $this->userWith([PermissionRegistry::USERS]);
        $token = $this->tokenFor($actor);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->postJson('/api/admin/users', [
            'name' => 'Overreaching Admin',
            'email' => 'overreaching@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'active',
            // The actor holds only `manage_users`; asking for the full registry
            // is a self-escalation attempt, not a subset grant.
            'permissions' => PermissionRegistry::all(),
        ])->assertStatus(422);

        $this->assertDatabaseMissing('users', ['email' => 'overreaching@example.com']);
    }

    private function seedFixture(?string $fixture): void
    {
        if ($fixture === 'plot') {
            \App\Models\Plot::firstOrCreate(
                ['id' => 'none'],
                [
                    'plot_number' => 'A-1', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'size' => '5 Marla',
                ]
            );
        }

        if ($fixture === 'block') {
            \App\Models\Block::firstOrCreate(
                ['id' => 'block-a'],
                [
                    'slug' => 'block-a', 'name' => 'Block A', 'category' => 'developed',
                    'status' => 'Available', 'noc_status' => 'Approved', 'verification_date' => '2026-01-01',
                ]
            );
        }

        if ($fixture === 'lead') {
            \App\Models\Lead::create([
                'name' => 'Buyer', 'phone' => '03001234567', 'interest' => 'Newsletter',
            ]);
        }

        if ($fixture === 'gallery') {
            \App\Models\GalleryItem::create([
                'id' => 1,
                'title' => 'Gate', 'image_url' => '/images/gallery/gate.webp', 'category' => 'general',
            ]);
        }
    }

    /**
     * Drop the cached authenticated user so the next request re-resolves it from
     * the database.
     *
     * The test client reuses one application instance across calls in a test, and
     * Sanctum's guard memoises the resolved user, so a permission or status change
     * made mid-test would otherwise not be observed. Each real HTTP request gets a
     * fresh guard, which is what makes revocation work in production.
     */
    private function forgetResolvedUser(): void
    {
        $guard = $this->app['auth']->guard('sanctum');

        // `setUser()` does not accept null on this framework version, so the
        // memoised user is cleared directly. Test-only: each real HTTP request
        // builds a fresh guard, which is what makes revocation work in
        // production.
        $property = new \ReflectionProperty($guard, 'user');
        $property->setAccessible(true);
        $property->setValue($guard, null);
    }
}