<?php

namespace Tests\Unit;

use App\Support\BooleanFullTextQuery;
use PHPUnit\Framework\TestCase;

/**
 * The boolean-mode expression is what lets MySQL satisfy a plot search from a
 * FULLTEXT index instead of scanning the table, so its shape matters:
 *
 *  - every token is required, so the result set does not widen on each term
 *  - operator characters from user input are stripped, so a crafted term cannot
 *    change the query's meaning
 *  - tokens below the index's minimum token size are dropped, because the
 *    FULLTEXT index cannot see them. When *every* token is dropped the builder
 *    returns null so the caller uses LIKE, which keeps recall identical to the
 *    original `LIKE '%term%'` implementation instead of silently returning
 *    nothing.
 */
class BooleanFullTextQueryTest extends TestCase
{
    public function test_it_requires_every_usable_token_so_the_result_set_does_not_widen()
    {
        $this->assertSame('+block +park*', BooleanFullTextQuery::build('block park'));
        $this->assertSame('+residential +available*', BooleanFullTextQuery::build('residential available'));
    }

    public function test_it_wildcards_only_the_final_token_for_prefix_matching()
    {
        $this->assertSame('+executive*', BooleanFullTextQuery::build('executive'));
        $this->assertSame('+main +boulevard*', BooleanFullTextQuery::build('main boulevard'));
    }

    public function test_it_splits_on_punctuation_and_requires_each_usable_part()
    {
        // "A" is below the minimum token size and is dropped; the row still
        // matches because it necessarily contains "125".
        $this->assertSame('+125*', BooleanFullTextQuery::build('A-125'));
        $this->assertSame('+Marla*', BooleanFullTextQuery::build('5 Marla'));
    }

    public function test_it_strips_boolean_operator_characters_from_user_input()
    {
        $this->assertSame('+marla*', BooleanFullTextQuery::build('+marla'));
        $this->assertSame('+marla*', BooleanFullTextQuery::build('-marla'));
        $this->assertSame('+marla*', BooleanFullTextQuery::build('marla*'));
        $this->assertSame('+marla*', BooleanFullTextQuery::build('"marla"'));
    }

    public function test_a_crafted_term_cannot_flip_the_query_to_a_negation()
    {
        // Without stripping, `-block +park` would mean "not block, and park".
        $built = BooleanFullTextQuery::build('-block +park');

        $this->assertSame('+block +park*', $built);
        $this->assertStringStartsNotWith('-', $built);
    }

    public function test_a_wildcard_only_term_cannot_turn_into_a_match_everything_query()
    {
        // A bare wildcard tokenizes to nothing, so no expression is produced
        // and the caller falls back to a literal LIKE. Without this guard the
        // term would reach MySQL as `AGAINST('*')`.
        $this->assertNull(BooleanFullTextQuery::build('*'));
        $this->assertNull(BooleanFullTextQuery::build('**'));
        $this->assertNull(BooleanFullTextQuery::build('-*+*'));
    }

    public function test_it_reports_no_expression_when_every_token_is_too_short_for_the_index()
    {
        $this->assertNull(BooleanFullTextQuery::build('5'));
        $this->assertNull(BooleanFullTextQuery::build('a'));
        $this->assertNull(BooleanFullTextQuery::build('!!'));
        $this->assertNull(BooleanFullTextQuery::build('   '));
    }

    public function test_a_mix_of_short_and_long_tokens_still_uses_the_index()
    {
        // "5" alone cannot match the index, but "Marla" can, and the row
        // containing "5 Marla" necessarily contains "Marla".
        $this->assertSame('+Marla*', BooleanFullTextQuery::build('5 Marla'));
    }

    public function test_unicode_tokens_are_measured_by_character_not_byte()
    {
        $this->assertSame('+فیصل*', BooleanFullTextQuery::build('فیصل'));
    }

    public function test_underscores_split_tokens_rather_than_escaping()
    {
        $this->assertNull(BooleanFullTextQuery::build('a_b'));
        $this->assertSame('+block*', BooleanFullTextQuery::build('block_a'));
    }
}