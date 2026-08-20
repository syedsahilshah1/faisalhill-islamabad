<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plot extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'plot_number', 'block_slug', 'block_name', 'category', 'size',
        'dimensions', 'price', 'price_formatted', 'price_history_trend',
        'status', 'facing', 'map_coords', 'features', 'description', 'image'
    ];

    protected $casts = [
        'map_coords' => 'array',
        'features' => 'array',
        'price' => 'float'
    ];
}
