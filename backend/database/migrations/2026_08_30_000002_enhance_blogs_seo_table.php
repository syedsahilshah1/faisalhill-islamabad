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
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('h1')->nullable()->after('title');
            $table->string('canonical_url')->nullable()->after('meta_description');
            $table->boolean('robots_index')->default(true)->after('canonical_url');
            $table->boolean('robots_follow')->default(true)->after('robots_index');
            $table->string('primary_keyword')->nullable()->after('keywords');
            $table->string('secondary_keywords')->nullable()->after('primary_keyword');
            $table->string('image_alt')->nullable()->after('image_url');
            $table->string('og_image')->nullable()->after('image_alt');
            $table->string('twitter_image')->nullable()->after('og_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn([
                'h1',
                'canonical_url',
                'robots_index',
                'robots_follow',
                'primary_keyword',
                'secondary_keywords',
                'image_alt',
                'og_image',
                'twitter_image'
            ]);
        });
    }
};
