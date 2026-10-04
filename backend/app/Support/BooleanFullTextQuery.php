<?php

namespace App\Support;

/**
 * Builds a MySQL FULLTEXT boolean-mode expression from a user search term.
 *
 * Why this exists
 * ---------------
 * The original search was `LIKE '%term%'` across five columns, which is a
 * guaranteed full table scan. Replacing it with a single-column LIKE is still a
 * scan, so the win only comes from a FULLTEXT index — and a FULLTEXT index is
 * only usable if the query is *purely* a MATCH.
 *
 * That is the trap: combining `MATCH(...) AGAINST(...)` with an
 * `OR search_index LIKE '%term%'` safety net looks more correct, but the OR with
 * a leading wildcard forces the optimizer back into a table scan, so the index
 * is never used and the "optimised" query ends up exactly as slow as the one it
 * replaced. The LIKE path is therefore chosen only when FULLTEXT provably cannot
 * help.
 *
 * Boolean mode also discards tokens shorter than `innodb_ft_min_token_size`
 * (3 by default). `build()` reports that case by returning null so the caller can
 * fall back to LIKE, which keeps recall identical to the original behaviour.
 */
final class BooleanFullTextQuery
{
    /**
     * MySQL's default `innodb_ft_min_token_size`. A token shorter than this is
     * invisible to the FULLTEXT index.
     */
    public const MIN_TOKEN_SIZE = 3;

    /**
     * Characters that carry boolean-mode operator meaning and must not be able
     * to leak in from user input.
     */
    private const RESERVED = ['+', '-', '*', '"', '(', ')', '~', '<', '>', '@'];

    /**
     * @return string|null A boolean-mode expression, or null when no token can
     *                     match the index and LIKE is the only option.
     */
    public static function build(string $term): ?string
    {
        $tokens = preg_split('/[^\p{L}\p{N}]+/u', $term, -1, PREG_SPLIT_NO_EMPTY) ?: [];

        $usable = [];

        foreach ($tokens as $token) {
            $clean = str_replace(self::RESERVED, '', $token);

            if (mb_strlen($clean) >= self::MIN_TOKEN_SIZE) {
                $usable[] = $clean;
            }
        }

        if ($usable === []) {
            return null;
        }

        // Every token is required. The final token gets a prefix wildcard so a
        // partially typed word still matches, which is what users expect from a
        // search-as-you-type box.
        $last = array_key_last($usable);

        $parts = [];

        foreach ($usable as $index => $token) {
            $parts[] = '+'.$token.($index === $last ? '*' : '');
        }

        return implode(' ', $parts);
    }
}