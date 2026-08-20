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
        'slug',
        'content',
        'summary',
        'image_url',
        'author',
        'category',
        'read_time',
        'published',
        'meta_title',
        'meta_description',
        'keywords',
        'faqs'
    ];

    protected $casts = [
        'published' => 'boolean',
        'faqs' => 'array'
    ];
}
