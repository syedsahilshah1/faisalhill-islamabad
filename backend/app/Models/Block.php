<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'slug', 'name', 'subtitle', 'category', 'status', 'noc_status',
        'verification_date', 'description', 'location_details', 'highlights',
        'total_plots', 'price_range', 'master_plan_image', 'hero_image',
        'amenities', 'faqs', 'development_updates'
    ];

    protected $casts = [
        'highlights' => 'array',
        'price_range' => 'array',
        'amenities' => 'array',
        'faqs' => 'array',
        'development_updates' => 'array'
    ];
}
