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
        Schema::table('seo_configs', function (Blueprint $table) {
            $table->string('h1_heading')->nullable()->after('title');
            $table->string('canonical_url')->nullable()->after('meta_description');
            $table->boolean('robots_index')->default(true)->after('canonical_url');
            $table->boolean('robots_follow')->default(true)->after('robots_index');
            $table->string('focus_keyword')->nullable()->after('keywords');
            $table->string('secondary_keywords')->nullable()->after('focus_keyword');
            $table->string('og_image')->nullable()->after('og_description');
            $table->string('twitter_title')->nullable()->after('og_image');
            $table->text('twitter_description')->nullable()->after('twitter_title');
            $table->string('twitter_image')->nullable()->after('twitter_description');
            $table->string('schema_type')->nullable()->after('twitter_image');
            $table->longText('custom_schema_json')->nullable()->after('schema_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seo_configs', function (Blueprint $table) {
            $table->dropColumn([
                'h1_heading',
                'canonical_url',
                'robots_index',
                'robots_follow',
                'focus_keyword',
                'secondary_keywords',
                'og_image',
                'twitter_title',
                'twitter_description',
                'twitter_image',
                'schema_type',
                'custom_schema_json'
            ]);
        });
    }
};
