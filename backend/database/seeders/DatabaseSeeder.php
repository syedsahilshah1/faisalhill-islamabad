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

        // Seed additional Faisal Hills data items
        $settingKeys = [
            'payment_plans_data' => 'paymentPlansData',
            'faisal_jewels_specs' => 'faisalJewelsSpecs',
            'faisal_jewels_surroundings' => 'faisalJewelsSurroundings',
            'faisal_jewels_apartment_details' => 'faisalJewelsApartmentDetails',
            'faisal_jewels_hotel_experience' => 'faisalJewelsHotelExperience',
            'faisal_jewel_residential_plan' => 'faisalJewelResidentialPlan',
            'faisal_jewel_commercial_plans' => 'faisalJewelCommercialPlans'
        ];

        foreach ($settingKeys as $dbKey => $jsonKey) {
            if (isset($data[$jsonKey])) {
                SiteSetting::updateOrCreate(
                    ['key' => $dbKey],
                    ['value' => $data[$jsonKey]]
                );
            }
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

        // 4. Seed Plots
        if (isset($data['plotInventoryData'])) {
            foreach ($data['plotInventoryData'] as $plot) {
                Plot::updateOrCreate(
                    ['id' => $plot['id']],
                    [
                        'plot_number' => $plot['plotNumber'],
                        'block_slug' => $plot['blockSlug'],
                        'block_name' => $plot['blockName'],
                        'category' => $plot['category'],
                        'size' => $plot['size'],
                        'dimensions' => $plot['dimensions'],
                        'price' => $plot['price'],
                        'price_formatted' => $plot['priceFormatted'] ?? null,
                        'price_history_trend' => $plot['priceHistoryTrend'] ?? null,
                        'status' => $plot['status'] ?? 'Available',
                        'facing' => $plot['facing'],
                        'map_coords' => $plot['mapCoords'] ?? null,
                        'features' => $plot['features'] ?? [],
                        'description' => $plot['description'] ?? null,
                        'image' => $plot['image'] ?? null,
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
