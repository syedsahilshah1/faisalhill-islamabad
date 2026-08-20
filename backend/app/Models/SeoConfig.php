<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoConfig extends Model
{
    protected $fillable = [
        'page_slug', 'title', 'meta_description', 'keywords', 'og_title', 'og_description'
    ];
}
