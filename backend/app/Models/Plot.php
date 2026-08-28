<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plot extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'plot_number', 'block_slug', 'block_name', 'property_type', 'category', 'size',
        'dimensions', 'price', 'price_unit', 'price_formatted', 'price_history_trend',
        'status', 'facing', 'street', 'location', 'map_coords', 'features', 'description', 'image',
        'featured', 'display_order'
    ];

    protected $casts = [
        'map_coords' => 'array',
        'features' => 'array',
        'price' => 'float',
        'featured' => 'boolean',
        'display_order' => 'integer'
    ];
}
