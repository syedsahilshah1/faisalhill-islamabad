<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Support\CachedValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BlockController extends Controller
{
    private const CACHE_ALL = 'fh_blocks_all';

    private const CACHE_SHOW_PREFIX = 'fh_block_';

    private const CACHE_TTL = 3600;

    /**
     * Legacy slugs that must all resolve to the Faisal Jewel block.
     *
     * @var array<int, string>
     */
    private const FAISAL_JEWEL_ALIASES = ['faisal-jewel-islamabad', 'faisal-jewels', 'faisal-jewel'];

    public function index()
    {
        $blocks = Cache::remember(self::CACHE_ALL, self::CACHE_TTL, function () {
            return Block::all();
        });
        return response()->json($blocks);
    }

    private function findBlock(string $identifier)
    {
        if (in_array($identifier, self::FAISAL_JEWEL_ALIASES, true)) {
            $block = Block::whereIn('slug', self::FAISAL_JEWEL_ALIASES)
                ->orWhereIn('id', self::FAISAL_JEWEL_ALIASES)
                ->first();
            if ($block) return $block;
        }

        return Block::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();
    }

    /**
     * Block detail, cached per identifier.
     *
     * Every block page renders metadata plus body content, and both resolve the
     * block by slug, so this collapses two lookups into one cached read.
     */
    public function show(string $identifier)
    {
        // Accept both id, slug, and common aliases
        $block = $this->rememberBlock($identifier);

        if (!$block) {
            return response()->json(['message' => 'Block not found'], 404);
        }

        return response()->json($block);
    }

    private function rememberBlock(string $identifier)
    {
        // Absence is cached as well as presence: a crawler walking random block
        // slugs must not be able to amplify queries through this public endpoint.
        return CachedValue::remember(
            self::CACHE_SHOW_PREFIX.$identifier,
            self::CACHE_TTL,
            fn () => $this->findBlock($identifier)
        );
    }

    public function update(Request $request, string $id)
    {
        $block = $this->findBlock($id);
        if (!$block) {
            return response()->json(['message' => 'Block not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'subtitle' => 'sometimes|string|nullable',
            'status' => 'sometimes|string',
            'noc_status' => 'sometimes|string',
            'verification_date' => 'sometimes|string',
            'description' => 'sometimes|string|nullable',
            'location_details' => 'sometimes|string|nullable',
            'highlights' => 'sometimes|array',
            'total_plots' => 'sometimes|integer',
            'price_range' => 'sometimes|array',
            'master_plan_image' => 'sometimes|string|nullable',
            'hero_image' => 'sometimes|string|nullable',
            'amenities' => 'sometimes|array',
            'faqs' => 'sometimes|array',
            'development_updates' => 'sometimes|array',
        ]);

        $block->update($validated);
        $this->flushBlockCache($block);

        return response()->json($block);
    }

    /**
     * A block can be cached under its slug, its id, and any alias, so the
     * identifier it was requested with is not enough to find every stale entry.
     */
    private function flushBlockCache(Block $block): void
    {
        Cache::forget(self::CACHE_ALL);

        $identifiers = array_unique(array_merge(
            [$block->id, $block->slug],
            self::FAISAL_JEWEL_ALIASES
        ));

        foreach ($identifiers as $identifier) {
            if ($identifier !== null) {
                Cache::forget(self::CACHE_SHOW_PREFIX.$identifier);
            }
        }
    }
}
