<?php

namespace Tests\Feature;

use App\Models\Block;
use App\Models\Plot;
use App\Models\User;
use App\Support\PermissionRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Verifies the HTTP layer that lets browsers and reverse proxies skip the API
 * entirely on a repeat visit.
 *
 * The behaviour under test is conditional requests: an unchanged resource must
 * be revalidated with a 304 instead of re-serialised and re-sent.
 */
class HttpCachingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Mirrors the Faisal Jewel alias set the controller resolves, so cache
        // invalidation across id/slug/alias can be verified.
        Block::create([
            'id' => 'faisal-jewels',
            'slug' => 'faisal-jewel-islamabad',
            'name' => 'Faisal Jewel',
            'category' => 'commercial_project',
            'status' => 'Available',
            'noc_status' => 'Approved',
            'verification_date' => '2026-01-01',
            'total_plots' => 300,
        ]);

        Plot::create([
            'id' => 'cache-plot-1',
            'plot_number' => 'A-1',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '5 Marla',
            'price' => 6500000,
            'status' => 'Available',
            'display_order' => 1,
        ]);

        Block::create([
            'id' => 'block-a',
            'slug' => 'block-a',
            'name' => 'Block A',
            'category' => 'developed',
            'status' => 'Available',
            'noc_status' => 'Approved',
            'verification_date' => '2026-01-01',
            'total_plots' => 100,
        ]);
    }

    /**
     * @return array<string, array{0: string}>
     */
    public static function cacheableEndpoints(): array
    {
        return [
            'plots' => ['api/plots'],
            'plot detail' => ['api/plots/cache-plot-1'],
            'blocks' => ['api/blocks'],
            'block detail' => ['api/blocks/block-a'],
            'settings' => ['api/settings'],
            'active redirects' => ['api/redirects/active'],
            'blogs' => ['api/blogs'],
        ];
    }

    /**
 * @param  array<string, array{0: string}>  $ignored
 */
    #[DataProvider('cacheableEndpoints')]
    public function test_public_reads_expose_a_validator(string $uri)
    {
        $response = $this->getJson('/'.$uri);

        $response->assertOk();
        $response->assertHeader('ETag');
        $this->assertNotNull(
            $response->headers->get('Last-Modified'),
            "{$uri} must expose Last-Modified for date-based revalidation"
        );
    }

    /**
 * @param  array<string, array{0: string}>  $ignored
 */
    #[DataProvider('cacheableEndpoints')]
    public function test_public_reads_are_cacheable_by_the_browser_and_any_shared_proxy(string $uri)
    {
        $cacheControl = $this->getJson('/'.$uri)->headers->get('Cache-Control');

        $this->assertStringContainsString('public', (string) $cacheControl);
        $this->assertStringContainsString('s-maxage=', (string) $cacheControl);
        $this->assertStringContainsString('stale-while-revalidate=', (string) $cacheControl);
    }

    public function test_a_repeat_visit_is_answered_with_304_instead_of_a_payload()
    {
        $first = $this->getJson('/api/plots');
        $etag = $first->headers->get('ETag');

        $second = $this->getJson('/api/plots', ['If-None-Match' => $etag]);

        $second->assertStatus(304);
        $this->assertSame('', $second->getContent());
    }

    public function test_a_weak_validator_still_revalidates_successfully()
    {
        $etag = $this->getJson('/api/plots')->headers->get('ETag');

        $this->getJson('/api/plots', ['If-None-Match' => 'W/'.$etag])->assertStatus(304);
    }

    public function test_a_stale_validator_returns_the_full_payload()
    {
        $this->getJson('/api/plots', ['If-None-Match' => '"stale-etag-value"'])->assertOk();
    }

    public function test_the_validator_changes_when_the_underlying_data_changes()
    {
        $before = $this->getJson('/api/plots')->headers->get('ETag');

        Plot::create([
            'id' => 'cache-plot-2',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'size' => '10 Marla',
            'display_order' => 2,
        ]);

        // The inventory cache must have been flushed by the write.
        $after = $this->getJson('/api/plots')->headers->get('ETag');

        $this->assertNotSame($before, $after);
        $this->getJson('/api/plots', ['If-None-Match' => $before])->assertOk();
    }

    public function test_an_if_modified_since_request_is_honoured()
    {
        $first = $this->getJson('/api/plots');
        $lastModified = $first->headers->get('Last-Modified');

        $this->getJson('/api/plots', ['If-Modified-Since' => $lastModified])->assertStatus(304);
    }

    public function test_error_responses_are_never_marked_cacheable()
    {
        $response = $this->getJson('/api/plots/does-not-exist');

        $response->assertStatus(404);
        $this->assertStringNotContainsString('public', (string) $response->headers->get('Cache-Control'));
    }

    public function test_authenticated_responses_are_not_written_to_a_shared_cache()
    {
        $user = User::create([
            'name' => 'Cache Admin',
            'email' => 'cache-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
            'permissions' => [PermissionRegistry::LEADS],
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->getJson('/api/leads');

        $response->assertOk();
        $this->assertStringNotContainsString(
            'public',
            (string) $response->headers->get('Cache-Control'),
            'An admin response must never be cached by a shared proxy'
        );
    }

    public function test_writes_are_never_marked_cacheable()
    {
        $response = $this->postJson('/api/leads', [
            'name' => 'Buyer',
            'phone' => '03001234567',
            'interest' => 'Newsletter',
        ]);

        $response->assertStatus(201);
        $this->assertStringNotContainsString('public', (string) $response->headers->get('Cache-Control'));
    }

    public function test_filtered_plot_lists_are_cached_per_filter_combination()
    {
        $byBlock = $this->getJson('/api/plots?block=block-a')->headers->get('ETag');
        $byOtherBlock = $this->getJson('/api/plots?block=block-b')->headers->get('ETag');

        $this->assertNotSame(
            $byBlock,
            $byOtherBlock,
            'Two different filter combinations must not share a cache entry'
        );
    }

    public function test_a_missing_block_is_negatively_cached()
    {
        $this->getJson('/api/blocks/no-such-block')->assertStatus(404);

        DB::flushQueryLog();
        DB::enableQueryLog();

        $this->getJson('/api/blocks/no-such-block')->assertStatus(404);

        $this->assertSame(
            0,
            count(DB::getQueryLog()),
            'A crawler walking random block slugs must not be able to amplify queries'
        );
    }

    public function test_block_detail_is_cached_and_invalidated_by_a_write()
    {
        $user = User::create([
            'name' => 'Block Admin',
            'email' => 'block-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
            'permissions' => [PermissionRegistry::BLOCK_RECORDS],
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $this->getJson('/api/blocks/block-a')->assertJsonPath('name', 'Block A');

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->putJson('/api/blocks/block-a', ['name' => 'Block A Revised'])
            ->assertOk();

        $this->getJson('/api/blocks/block-a')->assertJsonPath('name', 'Block A Revised');

        $names = array_column($this->getJson('/api/blocks')->json(), 'name');

        $this->assertContains('Block A Revised', $names);
        $this->assertNotContains('Block A', $names);
    }

    public function test_a_block_is_reachable_by_id_slug_and_alias_after_an_update()
    {
        $user = User::create([
            'name' => 'Alias Admin',
            'email' => 'alias-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
            'permissions' => [PermissionRegistry::BLOCK_RECORDS],
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->putJson('/api/blocks/faisal-jewel-islamabad', ['name' => 'Faisal Jewel Revised'])
            ->assertOk();

        // The block is cached under its id, its slug and each alias, so every
        // one of those must be invalidated by the same write.
        foreach (['faisal-jewel-islamabad', 'faisal-jewels', 'faisal-jewel'] as $alias) {
            $this->getJson('/api/blocks/'.$alias)->assertJsonPath('name', 'Faisal Jewel Revised');
        }
    }
}