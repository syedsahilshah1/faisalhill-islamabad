<?php

namespace App\Http\Controllers;

use App\Models\Block;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BlockController extends Controller
{
    public function index()
    {
        $blocks = Cache::remember('fh_blocks_all', 3600, function () {
            return Block::all();
        });
        return response()->json($blocks);
    }

    private function findBlock(string $identifier)
    {
        if (in_array($identifier, ['faisal-jewel-islamabad', 'faisal-jewels', 'faisal-jewel'])) {
            $block = Block::whereIn('slug', ['faisal-jewel-islamabad', 'faisal-jewels', 'faisal-jewel'])
                ->orWhereIn('id', ['faisal-jewel-islamabad', 'faisal-jewels', 'faisal-jewel'])
                ->first();
            if ($block) return $block;
        }

        return Block::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();
    }

    public function show(string $identifier)
    {
        // Accept both id, slug, and common aliases
        $block = $this->findBlock($identifier);

        if (!$block) {
            return response()->json(['message' => 'Block not found'], 404);
        }

        return response()->json($block);
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
        Cache::forget('fh_blocks_all');

        return response()->json($block);
    }
}
