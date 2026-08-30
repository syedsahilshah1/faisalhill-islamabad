<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoConfig extends Model
{
    protected $fillable = [
        'page_slug',
        'title',
        'h1_heading',
        'meta_description',
        'canonical_url',
        'robots_index',
        'robots_follow',
        'keywords',
        'focus_keyword',
        'secondary_keywords',
        'og_title',
        'og_description',
        'og_image',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'schema_type',
        'custom_schema_json'
    ];

    protected $casts = [
        'robots_index' => 'boolean',
        'robots_follow' => 'boolean',
    ];
}
