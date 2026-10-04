<?php

namespace Tests\Feature;

use App\Models\Plot;
use App\Support\PermissionRegistry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Plot listing resilience.
 *
 * The failure this file exists for: the database cache driver writes an entire
 * serialised value with a single INSERT, so any payload above the server's
 * `max_allowed_packet` fails the write. MariaDB on the development host is
 * capped at exactly 1 MiB while the full inventory serialised to roughly 820 KB,
 * so once a few plots were added the write crossed the limit and `/api/plots`
 * started returning 500 for every visitor — even though the underlying query was
 * healthy, indexed and fast. New plots appeared in the dashboard (which reads
 * the database directly) and vanished from every public page.
 *
 * Caching is a latency optimisation, so these tests pin the rule that it can
 * never decide whether a request succeeds.
 */
class PlotListingResilienceTest extends TestCase
{
    use RefreshDatabase;

    private function makePlots(int $count): void
    {
        foreach (range(1, $count) as $i) {
            Plot::create([
                'id' => 'bulk-'.$i,
                'plot_number' => 'P'.$i,
                'block_slug' => 'block-a',
                'block_name' => 'Block A',
                'property_type' => 'Residential',
                'category' => 'Residential',
                'size' => '5 Marla',
                'price' => 1000000 + $i,
                'status' => 'Available',
            ]);
        }
    }

    public function test_the_unfiltered_listing_succeeds_when_the_result_is_too_large_to_cache()
    {
        // Force every cache write to fail the way an oversized INSERT does.
        Cache::shouldReceive('get')->andThrow(new \RuntimeException('MySQL server has gone away'));
        Cache::shouldReceive('put')->andThrow(new \RuntimeException('MySQL server has gone away'));

        $this->makePlots(3);

        // The data is served regardless of whether the cache works at all.
        $this->getJson('/api/plots')
            ->assertOk()
            ->assertJsonCount(3);
    }

    public function test_a_filtered_listing_succeeds_when_the_cache_write_fails()
    {
        Cache::shouldReceive('get')->andThrow(new \RuntimeException('cache read failed'));
        Cache::shouldReceive('put')->andThrow(new \RuntimeException('cache write failed'));

        $this->makePlots(3);

        $this->getJson('/api/plots?block=block-a')
            ->assertOk()
            ->assertJsonCount(3);
    }

    public function test_a_plot_larger_than_the_packet_limit_is_served_but_not_cached()
    {
        // A genuinely oversized row, so the endpoint's own result exceeds the
        // 512 KiB self-limit rather than a synthetic stand-in for it.
        Plot::create([
            'id' => 'oversized-1',
            'plot_number' => 'BIG-1',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '1 Kanal',
            'price' => 9000000,
            'status' => 'Available',
            'description' => str_repeat('A', 700_000),
        ]);

        $serialised = strlen(serialize(Plot::query()->ordered()->get()));
        $this->assertGreaterThan(512 * 1024, $serialised, 'Fixture is not actually oversized');

        Cache::spy();

        // Served in full, and deliberately not written to the cache: the write is
        // what a 1 MiB packet limit rejects.
        $this->getJson('/api/plots')
            ->assertOk()
            ->assertJsonCount(1);

        Cache::shouldNotHaveReceived('put');
    }

    public function test_a_result_that_fits_is_still_cached()
    {
        $this->makePlots(2);

        Cache::spy();

        $this->getJson('/api/plots')->assertOk();

        // Caching must not have been disabled wholesale by the guard.
        Cache::shouldHaveReceived('put');
    }

    public function test_the_live_packet_limit_leaves_room_for_the_cached_payload()
    {
        $driver = DB::connection()->getDriverName();

        if (! in_array($driver, ['mysql', 'mariadb'], true)) {
            $this->markTestSkipped('The packet limit only applies to MySQL/MariaDB.');
        }

        $limit = (int) DB::selectOne('SELECT @@max_allowed_packet AS m')->m;
        $selfLimit = 512 * 1024;

        // Documents the actual production constraint: the controller's ceiling
        // has to sit below the server's, or the guard is pointless.
        $this->assertLessThan(
            $limit,
            $selfLimit,
            'CACHE_MAX_PAYLOAD_BYTES must stay under max_allowed_packet ('.$limit.' bytes).'
        );
    }
}
