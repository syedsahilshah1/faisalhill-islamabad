<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Redirect;

class RedirectSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['source_url' => '/about', 'destination_url' => '/about-us', 'status_code' => 301, 'notes' => 'Legacy about page'],
            ['source_url' => '/commercial', 'destination_url' => '/faisal-hills-commercial', 'status_code' => 301, 'notes' => 'Legacy commercial page'],
            ['source_url' => '/residential', 'destination_url' => '/faisal-hills-blocks', 'status_code' => 301, 'notes' => 'Legacy residential page'],
            ['source_url' => '/faisal-hills-block-a', 'destination_url' => '/blocks/block-a', 'status_code' => 301, 'notes' => 'Old block A url'],
            ['source_url' => '/block-b', 'destination_url' => '/blocks/block-b', 'status_code' => 301, 'notes' => 'Old block b url'],
            ['source_url' => '/block-c', 'destination_url' => '/blocks/block-c', 'status_code' => 301, 'notes' => 'Old block c url'],
            ['source_url' => '/block-d', 'destination_url' => '/blocks/block-d', 'status_code' => 301, 'notes' => 'Old block d url'],
            ['source_url' => '/plots-for-sale-taxila', 'destination_url' => '/plots', 'status_code' => 301, 'notes' => 'Keyword landing page redirect'],
            ['source_url' => '/block-b1-extension', 'destination_url' => '/blocks/block-b1-extension', 'status_code' => 301, 'notes' => 'Old block B1 ext url'],
            ['source_url' => '/payment-plan', 'destination_url' => '/faisal-hills-payment-plan', 'status_code' => 301, 'notes' => 'Old payment plan link'],
        ];

        foreach ($defaults as $d) {
            Redirect::firstOrCreate(['source_url' => $d['source_url']], $d);
        }
    }
}
