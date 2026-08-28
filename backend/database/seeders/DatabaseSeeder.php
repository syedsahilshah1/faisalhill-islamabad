<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Block;
use App\Models\Plot;
use App\Models\Lead;
use App\Models\GalleryItem;
use App\Models\SiteSetting;
use App\Models\SeoConfig;
use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::updateOrCreate(
            ['email' => 'ubaid@faisalhills.com'],
            [
                'name' => 'ubaid',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Load JSON data file
        $dataPath = database_path('seeders/faisal_hills_data.json');
        if (!File::exists($dataPath)) {
            $this->command->error("faisal_hills_data.json not found!");
            return;
        }

        $data = json_decode(File::get($dataPath), true);

        // 2. Seed Site Settings
        if (isset($data['societyStats'])) {
            SiteSetting::updateOrCreate(
                ['key' => 'society_stats'],
                ['value' => $data['societyStats']]
            );
            SiteSetting::updateOrCreate(
                ['key' => 'last_verified_date'],
                ['value' => $data['societyStats']['lastVerifiedDate'] ?? 'August 2026']
            );
        }

        // Seed additional Faisal Hills data items & legal/contact settings
        $settingKeys = [
            'payment_plans_data' => 'paymentPlansData',
            'faisal_jewels_specs' => 'faisalJewelsSpecs',
            'faisal_jewels_surroundings' => 'faisalJewelsSurroundings',
            'faisal_jewels_apartment_details' => 'faisalJewelsApartmentDetails',
            'faisal_jewels_hotel_experience' => 'faisalJewelsHotelExperience',
            'faisal_jewel_residential_plan' => 'faisalJewelResidentialPlan',
            'faisal_jewel_commercial_plans' => 'faisalJewelCommercialPlans',
            'terms_of_service' => 'termsOfService',
            'privacy_policy' => 'privacyPolicy',
            'bank_accounts' => 'bankAccounts',
            'social_links' => 'socialLinks',
            'contact_info' => 'contactInfo'
        ];

        foreach ($settingKeys as $dbKey => $jsonKey) {
            if (isset($data[$jsonKey])) {
                SiteSetting::updateOrCreate(
                    ['key' => $dbKey],
                    ['value' => $data[$jsonKey]]
                );
            }
        }

        // Default Terms of Service if not present
        if (!SiteSetting::where('key', 'terms_of_service')->exists()) {
            SiteSetting::create([
                'key' => 'terms_of_service',
                'value' => [
                    'title' => 'Terms of Service',
                    'lastUpdated' => 'August 2026',
                    'sections' => [
                        [
                            'title' => '1. Terms & Conditions of Use',
                            'content' => 'By accessing this website, you agree to comply with and be bound by these Terms of Service, all applicable laws, and regional real estate regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
                        ],
                        [
                            'title' => '2. Sales Partner Disclaimer',
                            'content' => 'This portal is operated by an authorized real estate sales agency and marketing partner. It is not the direct official website of the society developer (Zedem International or Faisal Town Group). All plot availability status, pricing charts, payment schedules, and installment rates are indicative of market values and are subject to correction or revision by the developer without prior notice.'
                        ],
                        [
                            'title' => '3. Revisions and Errata',
                            'content' => 'The materials appearing on this website could include technical, typographical, or photographic errors. While we make every effort to verify information with on-ground mapping and the official developer ledger, we do not warrant that any of the materials on this website are completely accurate, complete, or current.'
                        ],
                        [
                            'title' => '4. Verification Prior to Payment',
                            'content' => 'All buyers are advised to perform due diligence before making payments. Never transfer funds directly to individual sales agents; all bookings and installments must be paid via formal banking instruments (Pay Order, Demand Draft) in the name of the official society developer.'
                        ]
                    ]
                ]
            ]);
        }

        // Default Privacy Policy if not present
        if (!SiteSetting::where('key', 'privacy_policy')->exists()) {
            SiteSetting::create([
                'key' => 'privacy_policy',
                'value' => [
                    'title' => 'Privacy Policy',
                    'lastUpdated' => 'August 2026',
                    'sections' => [
                        [
                            'title' => '1. Information We Collect',
                            'content' => 'When you use our website or contact form, we collect the personal information you submit to us, which includes: your name, phone number, email address, inquiry interest, and device browser metadata.'
                        ],
                        [
                            'title' => '2. How We Use Your Information',
                            'content' => 'Your personal information is used exclusively to facilitate your real estate transactions and customer requests: to answer your specific inquiries about Faisal Hills plots, NOC status, prices, or payment plans, and to schedule site visits. We do not sell, rent, or trade your personal information with third parties.'
                        ],
                        [
                            'title' => '3. Cookies and Analytics',
                            'content' => 'We use temporary and persistent cookies to record site visits and improve page speeds. Cookies help us understand which blocks and articles get the most attention. You can disable cookies in your browser settings at any time.'
                        ],
                        [
                            'title' => '4. Consent Acceptance',
                            'content' => 'By submitting your details on our contact forms, you consent to our privacy policy and authorize our verified sales desk to reach out to you via call, WhatsApp, or email to assist with your inquiry.'
                        ]
                    ]
                ]
            ]);
        }

        // Default Bank Accounts for Booking
        if (!SiteSetting::where('key', 'bank_accounts')->exists()) {
            SiteSetting::create([
                'key' => 'bank_accounts',
                'value' => [
                    [
                        'id' => 'bank-1',
                        'bankName' => 'Habib Bank Limited (HBL)',
                        'accountTitle' => 'Zedem International (Pvt) Ltd',
                        'accountNumber' => '00427991827403',
                        'iban' => 'PK36HABB0000427991827403',
                        'branchCode' => '0042',
                        'branchName' => 'Blue Area Branch, Islamabad',
                        'instructions' => 'Please mention your Registration / Booking Form Number or Plot File Number on the deposit receipt.'
                    ],
                    [
                        'id' => 'bank-2',
                        'bankName' => 'Meezan Bank Limited',
                        'accountTitle' => 'Zedem International (Pvt) Ltd',
                        'accountNumber' => '01028471928472',
                        'iban' => 'PK55MEZN0001028471928472',
                        'branchCode' => '0102',
                        'branchName' => 'F-7 Markaz Branch, Islamabad',
                        'instructions' => 'Islamic banking mode for overseas and local client installment payments.'
                    ]
                ]
            ]);
        }

        // Default Social Links
        if (!SiteSetting::where('key', 'social_links')->exists()) {
            SiteSetting::create([
                'key' => 'social_links',
                'value' => [
                    'whatsapp' => '+923044811717',
                    'facebook' => 'https://facebook.com',
                    'instagram' => 'https://instagram.com',
                    'youtube' => 'https://youtube.com',
                    'linkedin' => 'https://linkedin.com',
                    'twitter' => 'https://twitter.com'
                ]
            ]);
        }

        // Default Contact Info
        if (!SiteSetting::where('key', 'contact_info')->exists()) {
            SiteSetting::create([
                'key' => 'contact_info',
                'value' => [
                    'headOffice' => 'Faisal Tower, Faisal Town Main Fateh Jang Road N-80 near Tarnol Interchange Motorway M-1, Rawalpindi Pakistan.',
                    'siteOffice' => 'Main Gate Entrance, N-5 GT Road, Near Taxila Bypass, Rawalpindi / Islamabad',
                    'salesDesk' => 'Office #401 Noor Mall 6th Road Rawalpindi.',
                    'phoneNumbers' => ['051-111-324-725', '051-2720504-5', '051-450000-2', '051-5443746-7'],
                    'salesHotline' => '+92 304 4811 717',
                    'email' => 'info@faisalhillsislamabadfh.com'
                ]
            ]);
        }

        // 3. Seed Blocks
        if (isset($data['blocksData'])) {
            foreach ($data['blocksData'] as $block) {
                Block::updateOrCreate(
                    ['id' => $block['id']],
                    [
                        'slug' => $block['slug'],
                        'name' => $block['name'],
                        'subtitle' => $block['subtitle'] ?? null,
                        'category' => $block['category'],
                        'status' => $block['status'],
                        'noc_status' => $block['nocStatus'],
                        'verification_date' => $block['verificationDate'] ?? 'August 2026',
                        'description' => $block['description'] ?? null,
                        'location_details' => $block['locationDetails'] ?? null,
                        'highlights' => $block['highlights'] ?? [],
                        'total_plots' => $block['totalPlots'] ?? 0,
                        'price_range' => $block['priceRange'] ?? [],
                        'master_plan_image' => $block['masterPlanImage'] ?? null,
                        'hero_image' => $block['heroImage'] ?? null,
                        'amenities' => $block['amenities'] ?? [],
                        'faqs' => $block['faqs'] ?? [],
                        'development_updates' => $block['developmentUpdates'] ?? [],
                    ]
                );
            }
        }

        // 4. Seed Plots (Comprehensive standard inventory across all 6 blocks + existing listings)
        $standardResidentialInventory = [
            // Block A
            ['id' => 'plot-a-5m', 'plot_number' => 'A-5M', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => '25 × 50 ft', 'price' => null, 'display_order' => 1],
            ['id' => 'plot-a-8m', 'plot_number' => 'A-8M', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => '30 × 60 ft', 'price' => null, 'display_order' => 2],
            ['id' => 'plot-a-10m', 'plot_number' => 'A-10M', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => '35 × 70 ft', 'price' => null, 'display_order' => 3],
            ['id' => 'plot-a-14m', 'plot_number' => 'A-14M', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => '40 × 80 ft', 'price' => null, 'display_order' => 4],
            ['id' => 'plot-a-1k', 'plot_number' => 'A-1K', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => '50 × 90 ft', 'price' => null, 'display_order' => 5],
            ['id' => 'plot-a-2k-1', 'plot_number' => 'A-2K-75', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '2 Kanal', 'dimensions' => '75 × 120 ft', 'price' => null, 'display_order' => 6],
            ['id' => 'plot-a-2k-2', 'plot_number' => 'A-2K-80', 'block_slug' => 'block-a', 'block_name' => 'Block A', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '2 Kanal', 'dimensions' => '80 × 120 ft', 'price' => null, 'display_order' => 7],

            // Block B
            ['id' => 'plot-b-5m', 'plot_number' => 'B-5M', 'block_slug' => 'block-b', 'block_name' => 'Block B', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => '25 × 50 ft', 'price' => null, 'display_order' => 8],
            ['id' => 'plot-b-8m', 'plot_number' => 'B-8M', 'block_slug' => 'block-b', 'block_name' => 'Block B', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => '30 × 60 ft', 'price' => null, 'display_order' => 9],
            ['id' => 'plot-b-10m', 'plot_number' => 'B-10M', 'block_slug' => 'block-b', 'block_name' => 'Block B', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => '35 × 70 ft', 'price' => null, 'display_order' => 10],
            ['id' => 'plot-b-14m', 'plot_number' => 'B-14M', 'block_slug' => 'block-b', 'block_name' => 'Block B', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => '40 × 80 ft', 'price' => null, 'display_order' => 11],
            ['id' => 'plot-b-1k', 'plot_number' => 'B-1K', 'block_slug' => 'block-b', 'block_name' => 'Block B', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => '50 × 90 ft', 'price' => null, 'display_order' => 12],

            // Block C
            ['id' => 'plot-c-5m', 'plot_number' => 'C-5M', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => '25 × 50 ft', 'price' => null, 'display_order' => 13],
            ['id' => 'plot-c-8m-1', 'plot_number' => 'C-8M-30', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => '30 × 60 ft', 'price' => null, 'display_order' => 14],
            ['id' => 'plot-c-8m-2', 'plot_number' => 'C-8M-40', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => '40 × 60 ft', 'price' => null, 'display_order' => 15],
            ['id' => 'plot-c-10m-1', 'plot_number' => 'C-10M-35', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => '35 × 70 ft', 'price' => null, 'display_order' => 16],
            ['id' => 'plot-c-10m-2', 'plot_number' => 'C-10M-40', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => '40 × 70 ft', 'price' => null, 'display_order' => 17],
            ['id' => 'plot-c-14m', 'plot_number' => 'C-14M', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => '40 × 80 ft', 'price' => null, 'display_order' => 18],
            ['id' => 'plot-c-1k', 'plot_number' => 'C-1K', 'block_slug' => 'block-c', 'block_name' => 'Block C', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => '50 × 90 ft', 'price' => null, 'display_order' => 19],

            // Block D
            ['id' => 'plot-d-5m', 'plot_number' => 'D-5M', 'block_slug' => 'block-d', 'block_name' => 'Block D', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 20],
            ['id' => 'plot-d-8m', 'plot_number' => 'D-8M', 'block_slug' => 'block-d', 'block_name' => 'Block D', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 21],
            ['id' => 'plot-d-10m', 'plot_number' => 'D-10M', 'block_slug' => 'block-d', 'block_name' => 'Block D', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 22],
            ['id' => 'plot-d-14m', 'plot_number' => 'D-14M', 'block_slug' => 'block-d', 'block_name' => 'Block D', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 23],
            ['id' => 'plot-d-1k', 'plot_number' => 'D-1K', 'block_slug' => 'block-d', 'block_name' => 'Block D', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 24],

            // Executive Block
            ['id' => 'plot-exe-5m', 'plot_number' => 'EXE-5M', 'block_slug' => 'executive-block', 'block_name' => 'Executive Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 25],
            ['id' => 'plot-exe-8m', 'plot_number' => 'EXE-8M', 'block_slug' => 'executive-block', 'block_name' => 'Executive Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 26],
            ['id' => 'plot-exe-10m', 'plot_number' => 'EXE-10M', 'block_slug' => 'executive-block', 'block_name' => 'Executive Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 27],
            ['id' => 'plot-exe-14m', 'plot_number' => 'EXE-14M', 'block_slug' => 'executive-block', 'block_name' => 'Executive Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 28],
            ['id' => 'plot-exe-1k', 'plot_number' => 'EXE-1K', 'block_slug' => 'executive-block', 'block_name' => 'Executive Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 29],

            // Prime Block
            ['id' => 'plot-prime-3.5m', 'plot_number' => 'PR-3.5M', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '3.5 Marla', 'dimensions' => '20 × 40 ft', 'price' => null, 'display_order' => 30],
            ['id' => 'plot-prime-5m', 'plot_number' => 'PR-5M', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '5 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 31],
            ['id' => 'plot-prime-8m', 'plot_number' => 'PR-8M', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '8 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 32],
            ['id' => 'plot-prime-10m', 'plot_number' => 'PR-10M', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '10 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 33],
            ['id' => 'plot-prime-14m', 'plot_number' => 'PR-14M', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '14 Marla', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 34],
            ['id' => 'plot-prime-1k', 'plot_number' => 'PR-1K', 'block_slug' => 'prime-block', 'block_name' => 'Prime Block', 'property_type' => 'Residential', 'category' => 'Residential', 'size' => '1 Kanal', 'dimensions' => 'Dimension not provided', 'price' => null, 'display_order' => 35],
        ];

        foreach ($standardResidentialInventory as $item) {
            Plot::updateOrCreate(
                ['id' => $item['id']],
                [
                    'plot_number' => $item['plot_number'],
                    'block_slug' => $item['block_slug'],
                    'block_name' => $item['block_name'],
                    'property_type' => $item['property_type'],
                    'category' => $item['category'],
                    'size' => $item['size'],
                    'dimensions' => $item['dimensions'],
                    'price' => $item['price'],
                    'price_unit' => 'Total Price',
                    'price_formatted' => $item['price'] ? 'PKR ' . $item['price'] : 'Contact for Price',
                    'status' => 'Available',
                    'facing' => 'Standard',
                    'display_order' => $item['display_order']
                ]
            );
        }

        // Additional existing sample plot listings
        if (isset($data['plotInventoryData'])) {
            foreach ($data['plotInventoryData'] as $idx => $plot) {
                Plot::updateOrCreate(
                    ['id' => $plot['id']],
                    [
                        'plot_number' => $plot['plotNumber'],
                        'block_slug' => $plot['blockSlug'],
                        'block_name' => $plot['blockName'],
                        'property_type' => $plot['category'] === 'Commercial' ? 'Commercial' : 'Residential',
                        'category' => $plot['category'],
                        'size' => $plot['size'],
                        'dimensions' => $plot['dimensions'],
                        'price' => $plot['price'],
                        'price_unit' => 'Total Price',
                        'price_formatted' => $plot['priceFormatted'] ?? null,
                        'price_history_trend' => $plot['priceHistoryTrend'] ?? null,
                        'status' => $plot['status'] ?? 'Available',
                        'facing' => $plot['facing'] ?? 'Standard',
                        'map_coords' => $plot['mapCoords'] ?? null,
                        'features' => $plot['features'] ?? [],
                        'description' => $plot['description'] ?? null,
                        'image' => $plot['image'] ?? null,
                        'display_order' => 50 + $idx
                    ]
                );
            }
        }

        // 5. Seed Gallery Items
        if (isset($data['initialGalleryData'])) {
            foreach ($data['initialGalleryData'] as $item) {
                GalleryItem::updateOrCreate(
                    ['id' => $item['id']],
                    [
                        'title' => $item['title'],
                        'category' => $item['category'],
                        'image_url' => $item['imageUrl'],
                        'description' => $item['description'] ?? null,
                        'date_added' => $item['dateAdded'] ?? null,
                    ]
                );
            }
        }

        // 6. Seed Leads
        if (isset($data['initialLeadsData'])) {
            foreach ($data['initialLeadsData'] as $lead) {
                Lead::create([
                    'name' => $lead['name'],
                    'phone' => $lead['phone'],
                    'interest' => $lead['interest'] ?? null,
                    'message' => $lead['message'] ?? null,
                    'submitted_at' => $lead['submittedAt'] ?? null,
                ]);
            }
        }

        // 7. Seed SEO Configurations
        if (isset($data['initialSeoConfig'])) {
            $seoConfig = $data['initialSeoConfig'];
            
            // Seed SEO Global config
            SiteSetting::updateOrCreate(
                ['key' => 'seo_global'],
                [
                    'value' => [
                        'siteName' => $seoConfig['siteName'] ?? 'Faisal Hills',
                        'defaultMetaDescription' => $seoConfig['defaultMetaDescription'] ?? '',
                        'defaultKeywords' => $seoConfig['defaultKeywords'] ?? ''
                    ]
                ]
            );

            // Seed Page configs
            if (isset($seoConfig['pages'])) {
                foreach ($seoConfig['pages'] as $page) {
                    SeoConfig::updateOrCreate(
                        ['page_slug' => $page['pageSlug']],
                        [
                            'title' => $page['metaTitle'] ?? $page['pageTitle'] ?? 'Faisal Hills',
                            'meta_description' => $page['metaDescription'] ?? '',
                            'keywords' => $page['metaKeywords'] ?? null,
                            'og_title' => $page['ogTitle'] ?? null,
                            'og_description' => $page['ogDescription'] ?? null,
                        ]
                    );
                }
            }
        }

        // 8. Seed Blogs
        $blogs = [
            [
                'id' => 'blog-seed-1',
                'title' => 'Faisal Hills Taxila: An RDA-Approved Gateway to Luxury Living',
                'slug' => 'faisal-hills-taxila-rda-approved-luxury-living',
                'content' => '<h2>Introduction to Faisal Hills</h2><p>Faisal Hills is a premium, RDA-approved housing society located on the main GT Road, Taxila, near Islamabad. Developed by Zedem International, this master-planned community offers state-of-the-art infrastructure, scenic Margalla Hills views, and a secure environment.</p><h3>Why Choose Faisal Hills?</h3><p>Faisal Hills stands out due to its prime location and RDA approval, ensuring a safe investment. The society features a variety of residential plots, commercial zones, and modern apartments, making it perfect for both homeowners and investors.</p><p>With facilities like underground utilities, carpeted roads, lush green parks, and a modern community center, residents can enjoy a comfortable lifestyle. It is conveniently situated close to the CPEC route, M-1, and M-2 motorways, providing easy accessibility.</p>',
                'summary' => 'Faisal Hills is a premium, RDA-approved housing society located on the main GT Road, Taxila, near Islamabad, offering state-of-the-art infrastructure and Margalla Hills views.',
                'image_url' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
                'author' => 'Ubaid Khan',
                'category' => 'Investment Guide',
                'read_time' => '4 min read',
                'published' => true,
                'meta_title' => 'Faisal Hills Taxila: RDA-Approved Luxury Society',
                'meta_description' => 'Discover Faisal Hills Taxila, an RDA-approved housing project near Islamabad. Read about its prime location, amenities, and investment potential.',
                'keywords' => 'Faisal Hills, Taxila, RDA Approved, Islamabad Real Estate, Plot Booking'
            ],
            [
                'id' => 'blog-seed-2',
                'title' => 'Executive Block Faisal Hills: Development Progress and Investment Potential',
                'slug' => 'executive-block-faisal-hills-development-investment',
                'content' => '<h2>Executive Block Development Overview</h2><p>The Executive Block at Faisal Hills is one of the most sought-after sectors in the society. Characterized by rapid development progress, it is positioned to offer high investment yields in the coming months.</p><h3>Recent Development Milestones</h3><p>Road carpeting, street light installation, and underground electrical wiring are almost complete in Sector A and B of the Executive Block. Development of parks and sports complexes is also moving at a fast pace.</p><p>Plot sizes range from 5 Marla to 1 Kanal, accommodating various budgets and requirements. Commercial areas are also active, with several multi-story buildings undergoing construction.</p><h3>Why Invest Now?</h3><p>Prices in the Executive Block have shown a steady upward trend. With possession available in key areas, now is the ideal time to buy a plot for immediate home construction or long-term capital appreciation.</p>',
                'summary' => 'Explore the latest development updates, plot options, and investment potential of the highly anticipated Executive Block in Faisal Hills.',
                'image_url' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
                'author' => 'Marketing Team',
                'category' => 'Development Update',
                'read_time' => '5 min read',
                'published' => true,
                'meta_title' => 'Executive Block Faisal Hills: Development & Investment',
                'meta_description' => 'Read our analysis of the Executive Block at Faisal Hills Taxila, featuring detailed development updates, plot sizes, and investment recommendations.',
                'keywords' => 'Executive Block, Faisal Hills Development, Taxila Plots, Real Estate Investment'
            ],
            [
                'id' => 'blog-seed-3',
                'title' => 'Faisal Jewels Tower: Luxury High-Rise Apartments in Taxila',
                'slug' => 'faisal-jewels-tower-luxury-high-rise-apartments',
                'content' => '<h2>Faisal Jewels Tower: Redefining Luxury</h2><p>Faisal Jewels is a premium high-rise commercial and residential tower located inside Faisal Hills. It is designed to offer a world-class shopping experience and luxury hotel-standard apartments.</p><h3>Key Features of Faisal Jewels</h3><p>From shopping mall levels to executive penthouses, Faisal Jewels represents premium architectural design. The tower provides 24/7 security, backup generators, high-speed elevators, and dedicated parking spaces.</p><p>Each apartment is crafted with modern layouts, high-quality finishes, and balconies facing the majestic Margalla Hills views.</p><h3>An Unmatched Commercial Opportunity</h3><p>For brands and businesses, Faisal Jewels provides unmatched foot traffic and visibility. The commercial shops are available on easy installment plans, ensuring excellent rental yields and business growth.</p>',
                'summary' => 'Faisal Jewels brings hotel-standard luxury apartments and a world-class shopping experience to Faisal Hills. Learn about pricing and features.',
                'image_url' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'author' => 'Editor',
                'category' => 'Project Launch',
                'read_time' => '3 min read',
                'published' => true,
                'meta_title' => 'Faisal Jewels Tower: Apartments & Shops for Sale',
                'meta_description' => 'Explore Faisal Jewels in Faisal Hills, Taxila. Invest in luxury Margalla-facing apartments and premium commercial shops on installments.',
                'keywords' => 'Faisal Jewels, Luxury Apartments Taxila, High Rise Faisal Hills, Commercial Shops'
            ]
        ];

        foreach ($blogs as $blog) {
            Blog::updateOrCreate(['id' => $blog['id']], $blog);
        }

        $this->command->info('Database seeded successfully!');
    }
}
