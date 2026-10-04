<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Guards the rate limiting configuration.
 *
 * Two things are verified separately:
 *
 *  1. Every route carries exactly one throttle limiter, so no endpoint can be
 *     reached without a budget. This is asserted from the route table itself
 *     rather than by firing hundreds of requests.
 *  2. The limiters actually enforce, using the real configured ceiling for the
 *     lead endpoint (small enough to test exhaustively) and the documented
 *     values for the high-volume read limiters.
 */
class RateLimitingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{0: string, 1: string, 2: bool}>
     */
    public static function publicReadRoutes(): array
    {
        return [
            'plots index' => ['get', 'api/plots', false],
            'plots show' => ['get', 'api/plots/plot-1', false],
            'blocks index' => ['get', 'api/blocks', false],
            'blocks show' => ['get', 'api/blocks/block-a', false],
            'gallery' => ['get', 'api/gallery', false],
            'settings index' => ['get', 'api/settings', false],
            'settings show' => ['get', 'api/settings/social_links', false],
            'seo index' => ['get', 'api/seo', false],
            'seo show' => ['get', 'api/seo/home', false],
            'sitemap routes' => ['get', 'api/sitemap-routes', false],
            'blogs index' => ['get', 'api/blogs', false],
            'blogs show' => ['get', 'api/blogs/some-post', false],
            'active redirects' => ['get', 'api/redirects/active', false],
        ];
    }

    /**
     * @param  array<string, array{0: string, 1: string, 2: bool}>  $ignored
     */
    #[DataProvider('publicReadRoutes')]
    public function test_public_read_routes_are_rate_limited(string $method, string $uri, bool $authenticated)
    {
        $middleware = $this->middlewareFor($method, $uri);

        $this->assertContains(
            'throttle:public-read',
            $middleware,
            "{$method} {$uri} must be protected by throttle:public-read"
        );
    }

    public function test_public_read_routes_use_exactly_one_throttle_limiter()
    {
        foreach (self::publicReadRoutes() as [$method, $uri]) {
            $throttles = array_values(array_filter(
                $this->middlewareFor($method, $uri),
                fn (string $middleware) => str_starts_with($middleware, 'throttle:')
            ));

            $this->assertCount(
                1,
                $throttles,
                "{$method} {$uri} should run one limiter, found: ".implode(', ', $throttles)
            );
        }
    }

    public function test_auth_routes_use_the_credential_scoped_limiter()
    {
        foreach ([['post', 'api/auth/login'], ['post', 'api/auth/forgot-password'], ['post', 'api/auth/reset-password']] as [$method, $uri]) {
            $this->assertContains('throttle:auth', $this->middlewareFor($method, $uri));
        }
    }

    public function test_lead_submission_uses_the_dedicated_lead_limiter()
    {
        $this->assertContains('throttle:leads', $this->middlewareFor('post', 'api/leads'));
    }

    public function test_redirect_hit_counter_cannot_be_used_to_amplify_database_writes()
    {
        $this->assertContains('throttle:public-write', $this->middlewareFor('post', 'api/redirects/hit'));
    }

    public function test_every_protected_route_is_rate_limited()
    {
        $protected = [
            ['get', 'api/auth/user'],
            ['post', 'api/auth/logout'],
            ['put', 'api/auth/password'],
            ['post', 'api/plots'],
            ['put', 'api/plots/plot-1'],
            ['delete', 'api/plots/plot-1'],
            ['get', 'api/leads'],
            ['delete', 'api/leads/1'],
            ['post', 'api/gallery'],
            ['put', 'api/settings'],
            ['put', 'api/settings/homepage_cms'],
            ['put', 'api/seo/global'],
            ['put', 'api/seo/home'],
            ['get', 'api/redirects'],
            ['post', 'api/redirects'],
            ['get', 'api/admin/blogs'],
            ['post', 'api/blogs'],
            ['put', 'api/blogs/blog-1'],
            ['delete', 'api/blogs/blog-1'],
            ['get', 'api/admin/users'],
            ['post', 'api/admin/users'],
        ];

        foreach ($protected as [$method, $uri]) {
            $throttles = array_values(array_filter(
                $this->middlewareFor($method, $uri),
                fn (string $middleware) => str_starts_with($middleware, 'throttle:')
            ));

            $this->assertCount(1, $throttles, "{$method} {$uri} must have exactly one throttle limiter");
        }
    }

    public function test_lead_endpoint_stops_accepting_submissions_after_the_configured_limit()
    {
        $payload = ['name' => 'Test Buyer', 'phone' => '03001234567', 'interest' => 'Newsletter'];

        // The real limiter allows 5 per minute, so the sixth must be rejected.
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $this->postJson('/api/leads', $payload)->assertStatus(201);
        }

        $this->postJson('/api/leads', $payload)->assertStatus(429);
    }

    public function test_lead_rate_limit_response_exposes_retry_headers()
    {
        $payload = ['name' => 'Test Buyer', 'phone' => '03001234567', 'interest' => 'Newsletter'];

        for ($attempt = 1; $attempt <= 6; $attempt++) {
            $this->postJson('/api/leads', $payload);
        }

        $response = $this->postJson('/api/leads', $payload);

        $response->assertStatus(429);
        $this->assertNotNull(
            $response->headers->get('Retry-After'),
            'A throttled response must tell the client when to retry'
        );
    }

    public function test_public_read_limiter_is_configured_with_browser_and_shared_budgets()
    {
        $limits = $this->evaluateLimiter('public-read', $this->requestFor('get', 'api/plots'));

        $perMinute = collect($limits)->first(fn ($limit) => $limit->maxAttempts === 180);
        $sharedIp = collect($limits)->first(fn ($limit) => $limit->key === 'read-ip:127.0.0.1');

        $this->assertNotNull($perMinute, 'A per-user/per-IP read budget of 180/min is expected');
        $this->assertNotNull($sharedIp, 'A separate aggregate per-IP budget is expected so one IP cannot consume the whole quota');
        $this->assertSame(600, $sharedIp->maxAttempts);
    }

    public function test_admin_write_limiter_is_configured_with_a_hourly_ceiling()
    {
        $user = User::create([
            'name' => 'Rate Admin',
            'email' => 'rate-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
        ]);

        $request = Request::create('/api/plots', 'POST');
        $request->setUserResolver(fn () => $user);

        $limits = $this->evaluateLimiter('admin-write', $request);

        $this->assertSame('admin-write:u'.$user->id, $limits[0]->key, 'The budget must be keyed on the user, not the shared IP');
        $this->assertSame(120, $limits[0]->maxAttempts);
        $this->assertSame(3000, $limits[1]->maxAttempts);
    }

    public function test_rate_limiters_are_keyed_by_user_when_authenticated_and_by_ip_otherwise()
    {
        $anonymous = $this->evaluateLimiter('public-read', $this->requestFor('get', 'api/plots'));
        $this->assertSame('read:ip:127.0.0.1', $anonymous[0]->key);

        $user = User::create([
            'name' => 'Keyed Admin',
            'email' => 'keyed-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
        ]);

        $authenticated = Request::create('/api/plots', 'GET');
        $authenticated->setUserResolver(fn () => $user);

        $this->assertSame('read:u'.$user->id, $this->evaluateLimiter('public-read', $authenticated)[0]->key);
    }

    public function test_auth_limiter_is_scoped_per_credential_so_one_attacker_cannot_lock_out_every_account()
    {
        $first = $this->evaluateLimiter('auth', Request::create('/api/auth/login', 'POST', ['username' => 'admin']));
        $second = $this->evaluateLimiter('auth', Request::create('/api/auth/login', 'POST', ['username' => 'someone-else']));

        $this->assertNotSame($first[0]->key, $second[0]->key);
        $this->assertSame(15, $first[0]->maxAttempts);
    }

    public function test_lead_limiter_enforces_minute_hour_and_day_budgets()
    {
        $limits = $this->evaluateLimiter('leads', $this->requestFor('post', 'api/leads'));

        $this->assertSame(5, $limits[0]->maxAttempts);
        $this->assertSame(20, $limits[1]->maxAttempts);
        $this->assertSame(60, $limits[2]->maxAttempts);
    }

    public function test_protected_routes_reject_anonymous_requests_before_acting()
    {
        $this->postJson('/api/plots', [
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'size' => '5 Marla',
        ])->assertStatus(401);

        $this->assertDatabaseCount('plots', 0);
    }

    public function test_deactivated_administrator_cannot_reach_the_api()
    {
        $user = User::create([
            'name' => 'Suspended Admin',
            'email' => 'suspended@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'suspended',
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/auth/user')
            ->assertStatus(403);
    }

    public function test_regular_admin_cannot_reach_super_admin_endpoints()
    {
        $user = User::create([
            'name' => 'Plain Admin',
            'email' => 'plain@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/admin/users')
            ->assertStatus(403);
    }

    public function test_plot_rate_limit_does_not_reject_ordinary_browsing()
    {
        // Well below the configured budget: a normal page load must never 429.
        for ($request = 0; $request < 12; $request++) {
            $this->getJson('/api/plots')->assertStatus(200);
        }
    }

    /**
     * @return array<int, string>
     */
    private function middlewareFor(string $method, string $uri): array
    {
        // Resolving through the router rather than scanning the route table
        // means a concrete URI such as `api/plots/plot-1` matches the
        // parameterised route `api/plots/{id}` without the test having to know
        // the parameter name.
        try {
            $route = app('router')->getRoutes()->match(
                Request::create('/'.ltrim($uri, '/'), strtoupper($method))
            );
        } catch (Throwable $e) {
            $this->fail("No route matched {$method} {$uri}: ".$e->getMessage());
        }

        return $route->gatherMiddleware();
    }

    private function requestFor(string $method, string $uri): Request
    {
        return Request::create('/'.ltrim($uri, '/'), strtoupper($method));
    }

    /**
     * @return array<int, \Illuminate\Cache\RateLimiting\Limit>
     */
    private function evaluateLimiter(string $name, Request $request): array
    {
        $limiter = RateLimiter::limiter($name);

        $this->assertNotNull($limiter, "Rate limiter [{$name}] is not registered");

        return $limiter($request);
    }
}