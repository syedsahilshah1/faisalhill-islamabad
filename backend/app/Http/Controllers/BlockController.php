<?php

namespace App\Http\Controllers;

use App\Models\Block;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function index()
    {
        return response()->json(Block::all());
    }

    public function show(string $identifier)
    {
        // Accept both id and slug
        $block = Block::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$block) {
            return response()->json(['message' => 'Block not found'], 404);
        }

        return response()->json($block);
    }

    public function update(Request $request, string $id)
    {
        $block = Block::find($id);
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

        return response()->json($block);
    }
}
