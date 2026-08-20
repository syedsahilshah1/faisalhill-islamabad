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
            $table->string('id')->primary(); // we will use string ID like 'plot-101' or uuid
            $table->string('plot_number');
            $table->string('block_slug');
            $table->string('block_name');
            $table->string('category'); // Residential, Commercial, Apartment
            $table->string('size');
            $table->string('dimensions');
            $table->decimal('price', 15, 2);
            $table->string('price_formatted')->nullable();
            $table->string('price_history_trend')->nullable();
            $table->string('status')->default('Available'); // Available, Reserved, Sold
            $table->string('facing'); // Park Facing, Corner, Main Boulevard, etc.
            $table->json('map_coords')->nullable(); // { x: ..., y: ... }
            $table->json('features')->nullable(); // array of strings
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
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
