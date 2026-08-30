<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'h1',
        'slug',
        'content',
        'summary',
        'image_url',
        'image_alt',
        'author',
        'category',
        'read_time',
        'published',
        'meta_title',
        'meta_description',
        'canonical_url',
        'robots_index',
        'robots_follow',
        'keywords',
        'primary_keyword',
        'secondary_keywords',
        'og_image',
        'twitter_image',
        'faqs'
    ];

    protected $casts = [
        'published' => 'boolean',
        'robots_index' => 'boolean',
        'robots_follow' => 'boolean',
        'faqs' => 'array'
    ];
}
