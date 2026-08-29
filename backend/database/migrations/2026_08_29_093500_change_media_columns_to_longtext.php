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
        Schema::table('blocks', function (Blueprint $table) {
            $table->longText('hero_image')->nullable()->change();
            $table->longText('master_plan_image')->nullable()->change();
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->longText('image_url')->nullable()->change();
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->longText('image_url')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blocks', function (Blueprint $table) {
            $table->string('hero_image', 255)->nullable()->change();
            $table->string('master_plan_image', 255)->nullable()->change();
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->string('image_url', 255)->nullable()->change();
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->string('image_url', 255)->nullable()->change();
        });
    }
};
