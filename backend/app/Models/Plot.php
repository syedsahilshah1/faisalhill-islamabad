<?php

namespace App\Models;

use App\Support\BooleanFullTextQuery;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Plot extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    /** Columns folded into the FULLTEXT-backed `search_index` column. */
    protected const SEARCHABLE_COLUMNS = [
        'plot_number',
        'size',
        'block_name',
        'facing',
        'street',
        'category',
        'status',
        'location',
    ];

    /** LIKE escape character; inert in both MySQL and SQLite string literals. */
    private const LIKE_ESCAPE = '!';

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

    protected static function booted(): void
    {
        // Keep the FULLTEXT column in sync so admin writes never leave search stale.
        static::saving(function (self $plot) {
            $plot->search_index = $plot->buildSearchIndex();
        });
    }

    public function buildSearchIndex(): string
    {
        $parts = [];

        foreach (self::SEARCHABLE_COLUMNS as $column) {
            $value = $this->getAttribute($column);

            if ($value === null || $value === '') {
                continue;
            }

            $parts[] = (string) $value;
        }

        return implode(' ', $parts);
    }

    public function block(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'block_slug', 'slug');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('display_order', 'asc')->orderBy('created_at', 'desc');
    }

    public function scopeInBlock(Builder $query, ?string $block): Builder
    {
        return $query->when($block, fn (Builder $q) => $q->where('block_slug', $block));
    }

    public function scopeOfPropertyType(Builder $query, ?string $propertyType): Builder
    {
        return $query->when($propertyType, fn (Builder $q) => $q->where('property_type', $propertyType));
    }

    public function scopeOfCategory(Builder $query, ?string $category): Builder
    {
        return $query->when($category, fn (Builder $q) => $q->where('category', $category));
    }

    public function scopeWithStatus(Builder $query, ?string $status): Builder
    {
        return $query->when($status, fn (Builder $q) => $q->where('status', $status));
    }

    public function scopeFeatured(Builder $query, ?bool $featured = true): Builder
    {
        if ($featured === null) {
            return $query;
        }

        return $query->where('featured', $featured);
    }

    public function scopeWithinPriceRange(Builder $query, ?float $min, ?float $max): Builder
    {
        return $query
            ->when($min !== null, fn (Builder $q) => $q->where('price', '>=', $min))
            ->when($max !== null, fn (Builder $q) => $q->where('price', '<=', $max));
    }

/**
     * Free-text search across the searchable columns.
     *
     * On MySQL/MariaDB this resolves to a single MATCH against the FULLTEXT
     * indexed `search_index` column, which is an index seek rather than a table
     * scan.
     *
     * The LIKE path is used only on drivers without FULLTEXT support, or when
     * every token in the term is too short for the index to see. It is
     * deliberately *not* OR-ed alongside the MATCH: that combination would
     * reintroduce a full table scan and negate the index entirely.
     */
public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if ($term === null || trim($term) === '') {
            return $query;
        }

        $term = trim($term);
        $booleanTerm = $query->getConnection()->getDriverName() === 'mysql'
            ? BooleanFullTextQuery::build($term)
            : null;

        if ($booleanTerm !== null) {
            return $query->whereRaw('MATCH(`search_index`) AGAINST (? IN BOOLEAN MODE)', [$booleanTerm]);
        }

        return $query->whereRaw('`search_index` LIKE ? ESCAPE ?', [$this->likePattern($term), self::LIKE_ESCAPE]);
    }

    /**
     * Escape LIKE metacharacters so a search for `%` or `_` is a literal search
     * instead of a wildcard that matches the whole table.
     *
     * The escape character is `!` rather than a backslash because MySQL treats
     * backslashes as escape characters inside string literals while SQLite does
     * not, so a backslash-based ESCAPE clause would behave differently per
     * driver. `!` is inert in both.
     */
    private function likePattern(string $term): string
    {
        $escaped = str_replace(
            [self::LIKE_ESCAPE, '%', '_'],
            [self::LIKE_ESCAPE.self::LIKE_ESCAPE, self::LIKE_ESCAPE.'%', self::LIKE_ESCAPE.'_'],
            $term
        );

        return '%'.$escaped.'%';
    }
}