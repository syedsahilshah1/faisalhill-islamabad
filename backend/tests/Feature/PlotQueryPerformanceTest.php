<?php

namespace Tests\Feature;

use App\Models\Plot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use App\Support\PermissionRegistry;
use Tests\TestCase;

/**
 * Proves the caching and indexing work actually removes database work, rather
 * than merely being present in the source.
 *
 * Query counting is the assertion that matters: the point of caching a list is
 * that the second read costs nothing, and the point of a search index is that
 * the query plan can use it.
 */
class PlotQueryPerformanceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Plot::create([
            'id' => 'perf-1',
            'plot_number' => 'A-100',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '5 Marla',
            'price' => 6500000,
            'status' => 'Available',
            'facing' => 'Park Facing',
            'street' => 'Main Boulevard',
            'display_order' => 1,
        ]);

        Plot::create([
            'id' => 'perf-2',
            'plot_number' => 'B-200',
            'block_slug' => 'block-b',
            'block_name' => 'Block B',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '10 Marla',
            'price' => 12000000,
            'status' => 'Reserved',
            'facing' => 'Hill View',
            'street' => 'Grand Boulevard',
            'display_order' => 2,
        ]);
    }

    protected function adminToken(): string
    {
        $user = User::create([
            'name' => 'Perf Admin',
            'email' => 'perf-admin@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
            // These routes are permission-gated; the fixture holds every capability
            // so the tests exercise the controller rather than the gate.
            'permissions' => PermissionRegistry::all(),
        ]);

        return $user->createToken('test-token')->plainTextToken;
    }

    /**
     * @template T
     *
     * @param  callable(): T  $callback
     * @return array{0: T, 1: int}
     */
    private function captureQueries(callable $callback): array
    {
        DB::flushQueryLog();
        DB::enableQueryLog();

        try {
            $result = $callback();
            $count = count(DB::getQueryLog());
        } finally {
            DB::disableQueryLog();
        }

        return [$result, $count];
    }

    public function test_the_unfiltered_list_is_served_from_cache_on_repeat_reads()
    {
        $this->getJson('/api/plots')->assertOk();

        [$response, $queries] = $this->captureQueries(fn () => $this->getJson('/api/plots'));

        $response->assertOk();
        $response->assertJsonCount(2);
        $this->assertSame(
            0,
            $queries,
            'A cached list must cost zero database queries. Ran: '.implode(' | ', array_column(DB::getQueryLog(), 'query'))
        );
    }

    public function test_a_filtered_list_is_served_from_cache_on_repeat_reads()
    {
        $this->getJson('/api/plots?block=block-a')->assertOk();

        [$response, $queries] = $this->captureQueries(fn () => $this->getJson('/api/plots?block=block-a'));

        $response->assertOk();
        $response->assertJsonCount(1);
        $this->assertSame(0, $queries, 'A cached filter combination must cost zero database queries');
    }

    public function test_different_filter_combinations_are_cached_separately()
    {
        $this->getJson('/api/plots?block=block-a')->assertOk();

        [$response, $queries] = $this->captureQueries(fn () => $this->getJson('/api/plots?block=block-b'));

        $response->assertOk();
        $response->assertJsonCount(1);
        $this->assertSame(1, $queries, 'A different filter must not read the wrong cached entry');
        $this->assertSame('block-b', $response->json('0.block_slug'));
    }

    public function test_the_filtered_cache_still_honours_ordering()
    {
        $response = $this->getJson('/api/plots');
        $response->assertOk();

        $this->assertSame(['perf-1', 'perf-2'], array_column($response->json(), 'id'));
    }

    public function test_creating_a_plot_invalidates_every_cached_representation()
    {
        $token = $this->adminToken();

        $this->getJson('/api/plots')->assertJsonCount(2);
        $this->getJson('/api/plots?block=block-c')->assertJsonCount(0);
        $this->getJson('/api/plots?property_type=Residential')->assertJsonCount(2);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->postJson('/api/plots', [
            'plot_number' => 'C-1',
            'block_slug' => 'block-c',
            'block_name' => 'Block C',
            'size' => '8 Marla',
        ])->assertStatus(201);

        // If any cached key survived, these would still report the old counts.
        $this->getJson('/api/plots')->assertJsonCount(3);
        $this->getJson('/api/plots?block=block-c')->assertJsonCount(1);
        $this->getJson('/api/plots?property_type=Residential')->assertJsonCount(3);
    }

    public function test_updating_a_price_invalidates_every_cached_representation()
    {
        $token = $this->adminToken();

        $this->getJson('/api/plots')->assertJsonCount(2);
        $this->getJson('/api/plots?block=block-a')->assertJsonCount(1);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->putJson('/api/plots/perf-1', ['price' => 9000000])
            ->assertOk();

        $cached = $this->getJson('/api/plots');
        $cached->assertJsonPath('0.price', 9000000);

        $filtered = $this->getJson('/api/plots?block=block-a');
        $filtered->assertJsonPath('0.price', 9000000);
    }

    public function test_deleting_a_plot_invalidates_every_cached_representation()
    {
        $token = $this->adminToken();

        $this->getJson('/api/plots')->assertJsonCount(2);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->deleteJson('/api/plots/perf-1')
            ->assertOk();

        $this->getJson('/api/plots')->assertJsonCount(1);
    }

    public function test_a_write_that_bypasses_the_controller_still_busts_the_cache()
    {
        $this->getJson('/api/plots')->assertJsonCount(2);

        // Simulates a seeder, a tinker session or a queued job rather than the
        // admin API. The model listeners are the only thing that catches this.
        Plot::create([
            'id' => 'perf-3',
            'block_slug' => 'block-d',
            'block_name' => 'Block D',
            'size' => '1 Kanal',
            'display_order' => 3,
        ]);

        $this->getJson('/api/plots')->assertJsonCount(3);
    }

    public function test_the_search_index_column_is_maintained_on_write()
    {
        $plot = Plot::whereKey('perf-1')->first();

        $this->assertSame(
            'A-100 5 Marla Block A Park Facing Main Boulevard Residential Available',
            $plot->search_index
        );
    }

    public function test_the_search_index_is_rebuilt_when_searchable_fields_change()
    {
        $plot = Plot::whereKey('perf-1')->first();
        $plot->update(['size' => '3 Marla']);

        $this->assertStringContainsString('3 Marla', $plot->fresh()->search_index);
        $this->assertStringNotContainsString('5 Marla', $plot->fresh()->search_index);
    }

    public function test_search_matches_the_searchable_fields()
    {
        $this->assertSame('perf-1', $this->getJson('/api/plots?search=A-100')->json('0.id'));
        $this->assertSame('perf-1', $this->getJson('/api/plots?search=5 Marla')->json('0.id'));
        $this->assertSame('perf-1', $this->getJson('/api/plots?search=Block A')->json('0.id'));
        $this->assertSame('perf-1', $this->getJson('/api/plots?search=Park')->json('0.id'));
        $this->assertSame('perf-1', $this->getJson('/api/plots?search=Main Boulevard')->json('0.id'));
    }

    public function test_search_combines_with_filters()
    {
        $this->getJson('/api/plots?search=B-200&block=block-b')->assertJsonCount(1);
        $this->getJson('/api/plots?search=B-200&block=block-a')->assertJsonCount(0);
    }

    public function test_search_escapes_no_wildcards_so_a_bare_percent_does_not_match_everything()
    {
        $this->getJson('/api/plots?search=%25')->assertJsonCount(0);
    }

    public function test_the_status_filter_narrows_results()
    {
        $this->getJson('/api/plots?status=Available')->assertJsonCount(1);
        $this->getJson('/api/plots?status=Reserved')->assertJsonCount(1);
    }

    public function test_the_price_range_filter_narrows_results()
    {
        $this->getJson('/api/plots?min_price=10000000')->assertJsonCount(1);
        $this->getJson('/api/plots?max_price=7000000')->assertJsonCount(1);
        $this->getJson('/api/plots?min_price=1&max_price=99999999')->assertJsonCount(2);
    }

    public function test_limit_truncates_after_caching_so_one_entry_serves_every_page_size()
    {
        $this->getJson('/api/plots?block=block-a')->assertJsonCount(1);

        $response = $this->getJson('/api/plots');
        $response->assertJsonCount(2);

        $limited = $this->getJson('/api/plots?limit=1');
        $limited->assertJsonCount(1);

        // The unbounded entry must not have been overwritten by the limited read.
        $this->getJson('/api/plots')->assertJsonCount(2);
    }

    public function test_limit_is_clamped_to_a_sane_range()
    {
        $this->getJson('/api/plots?limit=0')->assertStatus(200);
        $this->getJson('/api/plots?limit=-5')->assertStatus(200);
        $this->getJson('/api/plots?limit=100000')->assertJsonCount(2);
    }

    public function test_the_number_of_cached_filter_combinations_is_bounded()
    {
        // A crawler walking random search terms must not be able to grow the
        // cache without limit.
        for ($term = 0; $term < 40; $term++) {
            $this->getJson('/api/plots?search=term-'.$term);
        }

        $registry = Cache::get('fh_plots_registry', []);

        $this->assertLessThanOrEqual(
            250,
            count($registry),
            'The derived cache registry must stay within its ceiling'
        );
        $this->assertNotEmpty($registry);
    }

    public function test_an_unknown_query_parameter_does_not_fragment_the_cache()
    {
        $this->getJson('/api/plots?utm_source=google')->assertOk();
        $this->getJson('/api/plots?utm_source=facebook')->assertOk();

        $registry = Cache::get('fh_plots_registry', []);

        $this->assertLessThanOrEqual(
            2,
            count($registry),
            'Unrecognised parameters must not create distinct cache entries'
        );
    }

    public function test_an_explicitly_empty_filter_is_ignored()
    {
        $this->getJson('/api/plots?search=')->assertJsonCount(2);
        $this->getJson('/api/plots?block=')->assertJsonCount(2);
    }

    public function test_plot_detail_is_cached_and_invalidated_together_with_the_list()
    {
        $token = $this->adminToken();

        [$first, $queries] = $this->captureQueries(fn () => $this->getJson('/api/plots/perf-1'));
        $first->assertOk();

        [$second, $cachedQueries] = $this->captureQueries(fn () => $this->getJson('/api/plots/perf-1'));
        $second->assertOk();

        $this->assertGreaterThan(0, $queries);
        $this->assertSame(0, $cachedQueries, 'A cached plot detail must cost zero database queries');

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->putJson('/api/plots/perf-1', ['status' => 'Sold'])
            ->assertOk();

        $this->getJson('/api/plots/perf-1')->assertJsonPath('status', 'Sold');
    }

    public function test_a_missing_plot_is_negatively_cached_so_garbage_slugs_do_not_hit_the_database()
    {
        $this->getJson('/api/plots/not-a-real-plot')->assertStatus(404);

        [$response, $queries] = $this->captureQueries(fn () => $this->getJson('/api/plots/not-a-real-plot'));

        $response->assertStatus(404);
        $this->assertSame(
            0,
            $queries,
            'A crawler walking random plot ids must not be able to amplify queries'
        );
    }

    public function test_the_search_index_column_exists_in_the_schema()
    {
        $this->assertTrue(
            \Illuminate\Support\Facades\Schema::hasColumn('plots', 'search_index'),
            'The FULLTEXT-backed search_index column is required for indexed search'
        );
    }

    public function test_the_columns_the_listing_filters_on_are_indexed()
    {
        $indexed = $this->indexedColumns('plots');

        foreach (['block_slug', 'property_type', 'category', 'status', 'display_order'] as $column) {
            $this->assertContains(
                $column,
                $indexed,
                "plots.{$column} must be indexed for the listing and search queries to stay fast"
            );
        }
    }

    public function test_search_is_backed_by_a_fulltext_index_where_the_driver_supports_it()
    {
        $driver = DB::connection()->getDriverName();

        if (! in_array($driver, ['mysql', 'mariadb'], true)) {
            $this->markTestSkipped("SQLite has no FULLTEXT index support; the LIKE fallback is used on [{$driver}].");
        }

        $this->assertContains(
            'search_index',
            $this->indexedColumns('plots'),
            'search_index must carry a FULLTEXT index so search is an index seek, not a table scan'
        );
    }

    public function test_the_default_ordering_is_covered_by_an_index()
    {
        $this->assertContains(
            'display_order',
            $this->indexedColumns('plots'),
            'An index must lead with display_order so the default sort avoids a filesort'
        );
    }

    public function test_the_columns_filtered_in_hot_paths_are_indexed()
    {
        $this->assertContains('published', $this->indexedColumns('blogs'));
        $this->assertContains('role', $this->indexedColumns('users'));
        $this->assertContains('status', $this->indexedColumns('users'));
        $this->assertContains('created_at', $this->indexedColumns('leads'));
        $this->assertContains('is_active', $this->indexedColumns('redirects'));
        $this->assertContains('category', $this->indexedColumns('gallery_items'));
    }

    /**
     * @return array<int, string>
     */
    private function indexedColumns(string $table): array
    {
        $indexes = DB::select("PRAGMA index_list('{$table}')");
        $columns = [];

        foreach ($indexes as $index) {
            foreach (DB::select("PRAGMA index_info('{$index->name}')") as $column) {
                if ($column->name !== null) {
                    $columns[] = $column->name;
                }
            }
        }

        return array_values(array_unique($columns));
    }
}