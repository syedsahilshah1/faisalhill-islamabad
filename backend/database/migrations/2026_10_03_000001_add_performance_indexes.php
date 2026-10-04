<?php

use App\Models\Plot;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Performance indexes.
 *
 * The expensive gaps this closes:
 *
 *  1. Plot search ran `LIKE '%term%'` across five columns with no usable index,
 *     so every search was a full table scan. A dedicated `search_index` column
 *     plus a FULLTEXT index turns that into an index seek. The single column
 *     also halves the work for the LIKE fallback used on SQLite.
 *  2. Every plot listing sorted by `display_order ASC, created_at DESC`, which
 *     forced a filesort because no index covered the ordering.
 *  3. `blogs.published`, `users.role`, `users.status` and `redirects.is_active`
 *     were all filtered on in hot paths with no index at all.
 *  4. The `leads` table had zero indexes despite being paginated by admin.
 *
 * Every statement is guarded so the migration is safe to re-run and safe on
 * SQLite (which has no FULLTEXT support).
 */
return new class extends Migration
{
    public function up(): void
    {
        $driver = DB::connection()->getDriverName();
        $supportsFullText = in_array($driver, ['mysql', 'mariadb'], true);

        $this->addPlotSearchIndex($supportsFullText);
        $this->addPlotOrderingIndexes();
        $this->addBlockIndexes();
        $this->addBlogIndexes();
        $this->addUserIndexes();
        $this->addLeadIndexes();
        $this->addGalleryIndexes();
        $this->addRedirectIndexes();
    }

    public function down(): void
    {
        $driver = DB::connection()->getDriverName();
        $supportsFullText = in_array($driver, ['mysql', 'mariadb'], true);

        $indexes = [
            'plots' => $supportsFullText ? ['plots_search_ft'] : [],
            'blocks' => ['blocks_category_status_idx'],
            'blogs' => ['blogs_published_created_idx', 'blogs_category_published_idx'],
            'users' => ['users_role_status_idx'],
            'leads' => ['leads_created_at_idx', 'leads_interest_created_at_idx'],
            'gallery_items' => ['gallery_items_category_idx'],
            'redirects' => ['redirects_active_source_idx'],
        ];

        if (! $supportsFullText && Schema::hasColumn('plots', 'search_index')) {
            Schema::table('plots', function (Blueprint $table) {
                $table->dropColumn('search_index');
            });
        }

        foreach ($indexes as $table => $tableIndexes) {
            foreach ($tableIndexes as $index) {
                try {
                    Schema::table($table, fn (Blueprint $blueprint) => $blueprint->dropIndex($index));
                } catch (Throwable) {
                    // Index was never created on this driver.
                }
            }
        }

        foreach (['plots_order_idx', 'plots_block_type_status_idx'] as $index) {
            try {
                Schema::table('plots', fn (Blueprint $blueprint) => $blueprint->dropIndex($index));
            } catch (Throwable) {
                // Index was never created on this driver.
            }
        }
    }

    private function addPlotSearchIndex(bool $supportsFullText): void
    {
        if (! Schema::hasColumn('plots', 'search_index')) {
            Schema::table('plots', function (Blueprint $table) {
                $table->text('search_index')->nullable()->after('display_order');
            });
        }

        $this->backfillPlotSearchIndex();

        if ($supportsFullText && ! Schema::hasIndex('plots', 'plots_search_ft')) {
            DB::statement('ALTER TABLE `plots` ADD FULLTEXT INDEX `plots_search_ft` (`search_index`)');
        }
    }

    /**
     * Backfill in chunks so a large inventory never loads every row into memory.
     */
    private function backfillPlotSearchIndex(): void
    {
        Plot::query()
            ->select(['id', 'plot_number', 'size', 'block_name', 'facing', 'street', 'category', 'status', 'location', 'search_index'])
            ->chunkById(500, function ($plots) {
                foreach ($plots as $plot) {
                    if ($plot->search_index !== null && $plot->search_index !== '') {
                        continue;
                    }

                    Plot::withoutTimestamps(fn () => Plot::query()
                        ->whereKey($plot->getKey())
                        ->update(['search_index' => $this->buildSearchIndex($plot)]));
                }
            });
    }

    private function buildPlotSearchIndex(object $plot): string
    {
        return collect([
            $plot->plot_number,
            $plot->size,
            $plot->block_name,
            $plot->facing,
            $plot->street,
            $plot->category,
            $plot->status,
            $plot->location,
        ])
            ->filter(fn ($value) => $value !== null && $value !== '')
            ->implode(' ');
    }

    private function addPlotOrderingIndexes(): void
    {
        if (! Schema::hasIndex('plots', 'plots_order_idx')) {
            Schema::table('plots', function (Blueprint $table) {
                // Satisfies the default ORDER BY display_order ASC, created_at DESC
                // straight from the index instead of a filesort.
                $table->index(['display_order', 'created_at'], 'plots_order_idx');
            });
        }

        if (! Schema::hasIndex('plots', 'plots_block_type_status_idx')) {
            Schema::table('plots', function (Blueprint $table) {
                // Most common listing filter combination, with ordering included so
                // a filtered list is index-only.
                $table->index(['block_slug', 'property_type', 'status', 'display_order'], 'plots_block_type_status_idx');
            });
        }
    }

    private function addBlockIndexes(): void
    {
        if (Schema::hasTable('blocks') && ! Schema::hasIndex('blocks', 'blocks_category_status_idx')) {
            Schema::table('blocks', function (Blueprint $table) {
                $table->index(['category', 'status'], 'blocks_category_status_idx');
            });
        }
    }

    private function addBlogIndexes(): void
    {
        if (! Schema::hasTable('blogs')) {
            return;
        }

        if (! Schema::hasIndex('blogs', 'blogs_published_created_idx')) {
            Schema::table('blogs', function (Blueprint $table) {
                $table->index(['published', 'created_at'], 'blogs_published_created_idx');
            });
        }

        if (! Schema::hasIndex('blogs', 'blogs_category_published_idx')) {
            Schema::table('blogs', function (Blueprint $table) {
                $table->index(['category', 'published'], 'blogs_category_published_idx');
            });
        }
    }

    private function addUserIndexes(): void
    {
        if (! Schema::hasTable('users') || ! Schema::hasIndex('users', 'users_role_status_idx')) {
            Schema::table('users', function (Blueprint $table) {
                $table->index(['role', 'status'], 'users_role_status_idx');
            });
        }
    }

    private function addLeadIndexes(): void
    {
        if (! Schema::hasTable('leads')) {
            return;
        }

        if (! Schema::hasIndex('leads', 'leads_created_at_idx')) {
            Schema::table('leads', function (Blueprint $table) {
                $table->index('created_at', 'leads_created_at_idx');
            });
        }

        if (! Schema::hasIndex('leads', 'leads_interest_created_at_idx')) {
            Schema::table('leads', function (Blueprint $table) {
                $table->index(['interest', 'created_at'], 'leads_interest_created_at_idx');
            });
        }
    }

    private function addGalleryIndexes(): void
    {
        if (Schema::hasTable('gallery_items') && ! Schema::hasIndex('gallery_items', 'gallery_items_category_idx')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->index('category', 'gallery_items_category_idx');
            });
        }
    }

    private function addRedirectIndexes(): void
    {
        if (Schema::hasTable('redirects') && ! Schema::hasIndex('redirects', 'redirects_active_source_idx')) {
            Schema::table('redirects', function (Blueprint $table) {
                $table->index(['is_active', 'source_url'], 'redirects_active_source_idx');
            });
        }
    }
};