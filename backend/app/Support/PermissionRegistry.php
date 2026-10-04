<?php

namespace App\Support;

/**
 * The single source of truth for what an administrator may do.
 *
 * This registry is deliberately the *only* place a capability is declared.
 * Previously the permission list lived solely in the Next.js frontend
 * (`ALL_DASHBOARD_PERMISSIONS`), which meant the backend had no way to validate
 * the values it stored — a client could persist arbitrary junk into
 * `users.permissions`, and nothing ever consulted the column to make a
 * decision.
 *
 * Adding a capability is a three-step change: register it here, protect its
 * routes with `can:` in routes/api.php, and expose it in the admin UI's
 * permission picker. `PermissionRegistryTest` fails if those drift apart.
 */
final class PermissionRegistry
{
    /**
     * Content-management areas. Each maps to one settings key so access can be
     * granted per page instead of as one coarse "homepage CMS" bucket — a
     * content editor who owns the About page should not implicitly own leads.
     */
    public const HOMEPAGE_CMS = 'manage_homepage';
    public const BLOCKS_PAGE_CMS = 'manage_blocks_page';
    public const MASTER_PLAN_CMS = 'manage_master_plan';
    public const PAYMENT_PLAN_CMS = 'manage_payment_plan';
    public const NOC_STATUS_CMS = 'manage_noc_status';
    public const ABOUT_PAGE_CMS = 'manage_about_page';
    public const CONTACT_PAGE_CMS = 'manage_contact_page';
    public const LOCATION_PAGE_CMS = 'manage_location_page';
    public const COMMERCIAL_PAGE_CMS = 'manage_commercial_page';
    public const GALLERY_PAGE_CMS = 'manage_gallery_page';

    /** Site-wide settings. */
    public const CONTACT_SETTINGS = 'manage_contact_settings';
    public const LEGAL_POLICIES = 'manage_legal_policies';
    public const VERIFICATION_DATES = 'manage_verification_dates';
    public const SEO_SETTINGS = 'manage_seo';
    public const REDIRECTS = 'manage_redirects';

    /** Records. */
    public const PLOTS = 'manage_plots';
    public const BLOCK_RECORDS = 'manage_blocks';
    public const PLOT_SERIES = 'manage_plot_series';
    public const GALLERY = 'manage_gallery';
    public const BLOGS = 'manage_blogs';
    public const LEADS = 'manage_leads';

    /** Accounts. */
    public const USERS = 'manage_users';

    /**
     * Legacy coarse key kept only so old rows can be translated during the
     * migration. It is never accepted as a grantable permission afterwards.
     */
    public const LEGACY_HOME_CMS = 'manage_homepage_cms';

    /**
     * Every grantable permission, with the label and help text the admin UI
     * renders. Keep the descriptions concrete: an administrator is deciding who
     * can change public-facing content.
     *
     * @var array<string, array{label: string, group: string, description: string}>
     */
    private const PERMISSIONS = [
        self::HOMEPAGE_CMS => [
            'label' => 'Homepage Content',
            'group' => 'Content',
            'description' => 'Edit homepage sections, text, cards and images',
        ],
        self::BLOCKS_PAGE_CMS => [
            'label' => 'Blocks Page & Sectors',
            'group' => 'Content',
            'description' => 'Edit the blocks overview page and its sub-sector content',
        ],
        self::MASTER_PLAN_CMS => [
            'label' => 'Master Plan Page',
            'group' => 'Content',
            'description' => 'Edit the master plan page and map graphics',
        ],
        self::PAYMENT_PLAN_CMS => [
            'label' => 'Payment Plan Page',
            'group' => 'Content',
            'description' => 'Edit installment plans and the payment schedule',
        ],
        self::NOC_STATUS_CMS => [
            'label' => 'NOC Status Page',
            'group' => 'Content',
            'description' => 'Edit approval, NOC and verification status content',
        ],
        self::ABOUT_PAGE_CMS => [
            'label' => 'About Us Page',
            'group' => 'Content',
            'description' => 'Edit the About Us page copy, FAQs and images',
        ],
        self::CONTACT_PAGE_CMS => [
            'label' => 'Contact Page',
            'group' => 'Content',
            'description' => 'Edit the Contact page copy, map and block cards',
        ],
        self::LOCATION_PAGE_CMS => [
            'label' => 'Location Page',
            'group' => 'Content',
            'description' => 'Edit the location page, travel times and geography',
        ],
        self::COMMERCIAL_PAGE_CMS => [
            'label' => 'Commercial Page',
            'group' => 'Content',
            'description' => 'Edit the commercial page content',
        ],
        self::GALLERY_PAGE_CMS => [
            'label' => 'Gallery Page',
            'group' => 'Content',
            'description' => 'Edit the gallery page hero and call-to-action text',
        ],
        self::CONTACT_SETTINGS => [
            'label' => 'Contact Details & Social Links',
            'group' => 'Settings',
            'description' => 'Edit phone numbers, address, email and social profiles',
        ],
        self::LEGAL_POLICIES => [
            'label' => 'Legal Policies',
            'group' => 'Settings',
            'description' => 'Edit the Terms of Service and Privacy Policy',
        ],
        self::VERIFICATION_DATES => [
            'label' => 'Verification Dates',
            'group' => 'Settings',
            'description' => 'Edit the society verification date shown site-wide',
        ],
        self::SEO_SETTINGS => [
            'label' => 'SEO & Metadata',
            'group' => 'Settings',
            'description' => 'Edit page titles, meta descriptions and Open Graph tags',
        ],
        self::REDIRECTS => [
            'label' => 'URL Redirects',
            'group' => 'Settings',
            'description' => 'Create and edit URL redirects',
        ],
        self::PLOTS => [
            'label' => 'Plot Inventory',
            'group' => 'Records',
            'description' => 'Add, edit and delete plots and change prices',
        ],
        self::BLOCK_RECORDS => [
            'label' => 'Block Records',
            'group' => 'Records',
            'description' => 'Edit block details, NOC status and verification dates',
        ],
        self::PLOT_SERIES => [
            'label' => 'Plot Series & Pricing',
            'group' => 'Records',
            'description' => 'Configure plot series tags and price bands',
        ],
        self::GALLERY => [
            'label' => 'Photo Gallery',
            'group' => 'Records',
            'description' => 'Upload and remove gallery photos',
        ],
        self::BLOGS => [
            'label' => 'Blog Posts',
            'group' => 'Records',
            'description' => 'Create, edit and publish blog articles',
        ],
        self::LEADS => [
            'label' => 'Leads & Inquiries',
            'group' => 'Records',
            'description' => 'View and delete customer inquiry submissions',
        ],
        self::USERS => [
            'label' => 'Administrators',
            'group' => 'Accounts',
            'description' => 'Create administrators and change what they can access',
        ],
    ];

    /**
     * Which permission owns each settings key.
     *
     * `PUT /api/settings/{key}` accepts every CMS key on one route, so the
     * permission cannot be declared in routes/api.php and has to be resolved
     * from the key. A key missing from this map is not writable by anyone except
     * a super administrator, which fails closed: an unmapped key means CMS
     * content was added without deciding who should own it, and guessing would
     * hand it to every content editor.
     *
     * @var array<string, string>
     */
    private const SETTING_KEY_PERMISSIONS = [
        // Homepage
        'homepage_cms' => self::HOMEPAGE_CMS,
        'home_hero_bg_image' => self::HOMEPAGE_CMS,
        'home_hero_title' => self::HOMEPAGE_CMS,
        'home_hero_form_title' => self::HOMEPAGE_CMS,
        'home_hero_form_subtitle' => self::HOMEPAGE_CMS,

        // Blocks page and its per-block sub-editors
        'faisal_blocks_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_prime_block_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_executive_block_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_a_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_b_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_c_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_d_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_b1_ext_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_hills_walk_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_jewel_cms' => self::BLOCKS_PAGE_CMS,

        // Individual pages
        'faisal_master_plan_cms' => self::MASTER_PLAN_CMS,
        'faisal_payment_plan_cms' => self::PAYMENT_PLAN_CMS,
        'faisal_noc_status_cms' => self::NOC_STATUS_CMS,
        'about_us_cms' => self::ABOUT_PAGE_CMS,
        'contact_page_cms' => self::CONTACT_PAGE_CMS,
        'location_page_cms' => self::LOCATION_PAGE_CMS,
        'commercial_page_cms' => self::COMMERCIAL_PAGE_CMS,
        'gallery_page_cms' => self::GALLERY_PAGE_CMS,
        'commercial_hero_image' => self::COMMERCIAL_PAGE_CMS,

        // Site-wide settings
        'privacy_policy' => self::LEGAL_POLICIES,
        'terms_of_service' => self::LEGAL_POLICIES,
        'contact_info' => self::CONTACT_SETTINGS,
        'social_links' => self::CONTACT_SETTINGS,
        'bank_accounts' => self::CONTACT_SETTINGS,
        'last_verified_date' => self::VERIFICATION_DATES,
        'society_stats' => self::VERIFICATION_DATES,
    ];

    /**
     * Map a legacy coarse permission onto its granular replacements.
     *
     * @var array<string, array<int, string>>
     */
    private const LEGACY_EXPANSION = [
        self::LEGACY_HOME_CMS => [
            self::HOMEPAGE_CMS,
            self::BLOCKS_PAGE_CMS,
            self::MASTER_PLAN_CMS,
            self::PAYMENT_PLAN_CMS,
            self::NOC_STATUS_CMS,
            self::LEGAL_POLICIES,
            self::CONTACT_SETTINGS,
            self::VERIFICATION_DATES,
        ],
    ];

/**
 * Which permission owns each settings key.
     *
     * `PUT /api/settings/{key}` accepts every CMS key on one route, so the
        // Homepage
        'homepage_cms' => self::HOMEPAGE_CMS,
        'home_hero_bg_image' => self::HOMEPAGE_CMS,
        'home_hero_title' => self::HOMEPAGE_CMS,
        'home_hero_form_title' => self::HOMEPAGE_CMS,
        'home_hero_form_subtitle' => self::HOMEPAGE_CMS,

        // Blocks page and its per-block sub-editors
        'faisal_blocks_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_prime_block_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_executive_block_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_a_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_b_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_c_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_d_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_block_b1_ext_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_hills_walk_cms' => self::BLOCKS_PAGE_CMS,
        'faisal_jewel_cms' => self::BLOCKS_PAGE_CMS,

        // Individual pages
        'faisal_master_plan_cms' => self::MASTER_PLAN_CMS,
        'faisal_payment_plan_cms' => self::PAYMENT_PLAN_CMS,
        'faisal_noc_status_cms' => self::NOC_STATUS_CMS,
        'about_us_cms' => self::ABOUT_PAGE_CMS,
        'contact_page_cms' => self::CONTACT_PAGE_CMS,
        'location_page_cms' => self::LOCATION_PAGE_CMS,
        'commercial_page_cms' => self::COMMERCIAL_PAGE_CMS,
        'gallery_page_cms' => self::GALLERY_PAGE_CMS,
        'commercial_hero_image' => self::COMMERCIAL_PAGE_CMS,

        // Site-wide settings
        'privacy_policy' => self::LEGAL_POLICIES,
        'terms_of_service' => self::LEGAL_POLICIES,
        'contact_info' => self::CONTACT_SETTINGS,
        'social_links' => self::CONTACT_SETTINGS,
        'bank_accounts' => self::CONTACT_SETTINGS,
        'last_verified_date' => self::VERIFICATION_DATES,
        'society_stats' => self::VERIFICATION_DATES,
    ];

    /**
     * @return array<int, string>
     */
    public static function all(): array
    {
        return array_keys(self::PERMISSIONS);
    }

    /**
     * The permission that governs a settings key, or null when the key is not
     * mapped and therefore not writable by a non-super administrator.
     */
    public static function permissionForSettingKey(string $key): ?string
    {
        return self::SETTING_KEY_PERMISSIONS[$key] ?? null;
    }

    /**
     * @return array<int, string>
     */
    public static function mappedSettingKeys(): array
    {
        return array_keys(self::SETTING_KEY_PERMISSIONS);
    }

    public static function exists(string $permission): bool
    {
        return array_key_exists($permission, self::PERMISSIONS);
    }

    /**
     * @return array{label: string, group: string, description: string}|null
     */
    public static function describe(string $permission): ?array
    {
        return self::PERMISSIONS[$permission] ?? null;
    }

    /**
     * @return array<string, array<int, array{label: string, description: string}>>
     */
    public static function grouped(): array
    {
        $grouped = [];

        foreach (self::PERMISSIONS as $key => $meta) {
            $grouped[$meta['group']][] = [
                'key' => $key,
                'label' => $meta['label'],
                'description' => $meta['description'],
            ];
        }

        return $grouped;
    }

    /**
     * Keep only recognised permissions, expand legacy keys, drop duplicates and
     * preserve registry order so the stored array is stable across saves.
     *
     * Anything unrecognised is dropped rather than stored: the column is the
     * input to authorization decisions, so it must not be able to carry values
     * the server has never heard of.
     *
     * @param  mixed  $permissions
     * @return array<int, string>
     */
    public static function sanitize(mixed $permissions): array
    {
        if (! is_array($permissions)) {
            return [];
        }

        $expanded = [];

        foreach ($permissions as $permission) {
            if (! is_string($permission)) {
                continue;
            }

            if (isset(self::LEGACY_EXPANSION[$permission])) {
                array_push($expanded, ...self::LEGACY_EXPANSION[$permission]);

                continue;
            }

            if (self::exists($permission)) {
                $expanded[] = $permission;
            }
        }

        $unique = array_unique($expanded);

        // Re-key through `self::PERMISSIONS` so output order is the registry
        // order rather than the caller's, which makes diffs and tests stable.
        return array_values(array_filter(self::all(), fn (string $key) => in_array($key, $unique, true)));
    }

    /**
     * @return array<int, string>
     */
    public static function expandLegacy(array $permissions): array
    {
        return self::sanitize($permissions);
    }

    /**
     * Every permission except account management, used to grant an existing
     * account the same reach it had before permissions were enforced.
     *
     * @return array<int, string>
     */
    public static function legacyDefaultGrant(): array
    {
        return array_values(array_filter(self::all(), fn (string $key) => $key !== self::USERS));
    }

    /**
     * @return array<int, array{key: string, label: string, group: string, description: string}>
     */
    public static function forApi(): array
    {
        $out = [];

        foreach (self::PERMISSIONS as $key => $meta) {
            $out[] = [
                'key' => $key,
                'label' => $meta['label'],
                'group' => $meta['group'],
                'description' => $meta['description'],
            ];
        }

        return $out;
    }
}