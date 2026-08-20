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
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->string('id')->primary(); // we will use string ID like 'gal-123'
            $table->string('title');
            $table->string('category'); // Infrastructure, Towers, Amenities, Entrance
            $table->string('image_url');
            $table->text('description')->nullable();
            $table->string('date_added')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};
