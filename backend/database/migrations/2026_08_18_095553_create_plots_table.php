<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plots', function (Blueprint $table) {
            $table->string('id')->primary(); // string ID e.g. 'plot-101' or uuid
            $table->string('plot_number')->nullable();
            $table->string('block_slug')->index();
            $table->string('block_name');
            $table->string('property_type')->default('Residential')->index(); // Residential, Commercial
            $table->string('category')->default('Residential')->index(); // Residential, Commercial, Apartment
            $table->string('size')->index();
            $table->string('dimensions')->default('Dimension not provided');
            $table->decimal('price', 15, 2)->nullable()->index();
            $table->string('price_unit')->default('Total Price'); // Total Price, Per Marla, Per Kanal
            $table->string('price_formatted')->nullable();
            $table->string('price_history_trend')->nullable();
            $table->string('status')->default('Available')->index(); // Available, Reserved, Sold, Coming Soon, Unavailable
            $table->string('facing')->nullable(); // Park Facing, Corner, Main Boulevard, Standard
            $table->string('street')->nullable();
            $table->string('location')->nullable();
            $table->json('map_coords')->nullable(); // { x: ..., y: ... }
            $table->json('features')->nullable(); // array of strings
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('featured')->default(false)->index();
            $table->integer('display_order')->default(0)->index();
            $table->timestamps();

            // Composite indexes for fast high-traffic queries
            $table->index(['block_slug', 'category', 'status']);
            $table->index(['block_slug', 'display_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plots');
    }
};
