<?php

namespace Tests\Feature;

use App\Support\PermissionRegistry;
use Tests\TestCase;
use App\Models\Block;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BlockControllerTest extends TestCase
{
    use RefreshDatabase;

    protected string $token;
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test user and get token
        $this->user = User::create([
            'name' => 'Test Admin',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'role' => 'admin',
            'status' => 'active',
            // These routes are permission-gated; the fixture holds every capability
            // so the tests exercise the controller rather than the gate.
            'permissions' => PermissionRegistry::all(),
        ]);
        
        $this->token = $this->user->createToken('test-token')->plainTextToken;
        
        Block::create([
            'id' => 'executive-block',
            'slug' => 'executive-block',
            'name' => 'Executive Block',
            'subtitle' => 'Premium Gateway Sector',
            'category' => 'developed',
            'status' => 'Possession Ready',
            'noc_status' => 'RDA Approved',
            'verification_date' => 'August 2026',
            'description' => 'Executive Block description',
            'location_details' => 'Main GT Road Entrance',
            'highlights' => ['Main Boulevard', 'School', 'Mosque'],
            'total_plots' => 2400,
            'price_range' => ['residential' => 'PKR 65 Lacs - 1.85 Crore', 'commercial' => 'PKR 2.2 Crore - 8.5 Crore'],
            'master_plan_image' => '/images/executive-map.webp',
            'hero_image' => '/images/executive-hero.webp',
            'amenities' => [['name' => 'School', 'icon' => 'GraduationCap']],
            'faqs' => [['question' => 'Is it RDA approved?', 'answer' => 'Yes']],
            'development_updates' => [['title' => 'Road Complete', 'progress' => 100]],
        ]);

        Block::create([
            'id' => 'block-a',
            'slug' => 'block-a',
            'name' => 'Block A',
            'subtitle' => 'Fully Developed',
            'category' => 'developed',
            'status' => 'Fully Developed',
            'noc_status' => 'RDA Approved',
            'verification_date' => 'August 2026',
            'description' => 'Block A description',
            'location_details' => 'Adjoining Executive Block',
            'highlights' => ['Grand Mosque', 'Commercial Hub'],
            'total_plots' => 3100,
            'price_range' => ['residential' => 'PKR 55 Lacs - 1.6 Crore', 'commercial' => 'PKR 1.8 Crore - 6.5 Crore'],
            'master_plan_image' => '/images/block-a-map.webp',
            'hero_image' => '/images/block-a-hero.webp',
            'amenities' => [['name' => 'Mosque', 'icon' => 'Landmark']],
            'faqs' => [['question' => 'Is it developed?', 'answer' => 'Yes']],
            'development_updates' => [['title' => 'Mosque Expansion', 'progress' => 90]],
        ]);

        Block::create([
            'id' => 'faisal-jewels',
            'slug' => 'faisal-jewel-islamabad',
            'name' => 'Faisal Jewel',
            'subtitle' => '27-Story High-Rise',
            'category' => 'commercial_project',
            'status' => 'Under Construction',
            'noc_status' => 'RDA Approved',
            'verification_date' => 'August 2026',
            'description' => 'Faisal Jewel description',
            'location_details' => 'GT Road & M1 Interchange',
            'highlights' => ['27 Stories', 'Apartments', 'Shops'],
            'total_plots' => 600,
            'price_range' => ['residential' => 'Starting PKR 5.8 Lacs', 'commercial' => 'PKR 1.8 Crore - 18 Crore'],
            'master_plan_image' => '/images/faisal-jewel-map.webp',
            'hero_image' => '/images/faisal-jewel-hero.webp',
            'amenities' => [['name' => 'Pool', 'icon' => 'Waves']],
            'faqs' => [['question' => 'When complete?', 'answer' => 'Q4 2027']],
            'development_updates' => [['title' => 'Structure', 'progress' => 40]],
        ]);
    }

    protected function withAuth(array $headers = []): self
    {
        return $this->withHeaders(array_merge([
            'Authorization' => 'Bearer ' . $this->token,
        ], $headers));
    }

    public function test_index_returns_all_blocks()
    {
        $response = $this->getJson('/api/blocks');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(3, $data);
    }

    public function test_show_returns_block_by_id()
    {
        $response = $this->getJson('/api/blocks/executive-block');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('executive-block', $data['id']);
        $this->assertEquals('Executive Block', $data['name']);
    }

    public function test_show_returns_block_by_slug()
    {
        $response = $this->getJson('/api/blocks/block-a');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('block-a', $data['slug']);
        $this->assertEquals('Block A', $data['name']);
    }

    public function test_show_handles_faisal_jewel_aliases()
    {
        $response = $this->getJson('/api/blocks/faisal-jewel-islamabad');
        $response->assertStatus(200);
        $this->assertEquals('Faisal Jewel', $response->json()['name']);

        $response = $this->getJson('/api/blocks/faisal-jewels');
        $response->assertStatus(200);
        $this->assertEquals('Faisal Jewel', $response->json()['name']);

        $response = $this->getJson('/api/blocks/faisal-jewel');
        $response->assertStatus(200);
        $this->assertEquals('Faisal Jewel', $response->json()['name']);
    }

    public function test_show_returns_404_for_non_existent()
    {
        $response = $this->getJson('/api/blocks/non-existent');
        
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Block not found']);
    }

    public function test_update_modifies_block()
    {
        $payload = [
            'name' => 'Updated Executive Block',
            'status' => 'Updated Status',
            'highlights' => ['Updated Highlight 1', 'Updated Highlight 2'],
        ];

        $response = $this->withAuth()->putJson('/api/blocks/executive-block', $payload);
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('Updated Executive Block', $data['name']);
        $this->assertEquals('Updated Status', $data['status']);
        $this->assertEquals(['Updated Highlight 1', 'Updated Highlight 2'], $data['highlights']);
        
        $this->assertDatabaseHas('blocks', ['id' => 'executive-block', 'name' => 'Updated Executive Block']);
    }

    public function test_update_returns_404_for_non_existent()
    {
        $response = $this->withAuth()->putJson('/api/blocks/non-existent', ['name' => 'Test']);
        
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Block not found']);
    }

    public function test_update_validates_data()
    {
        $payload = [
            'total_plots' => 'not-an-integer',
        ];

        $response = $this->withAuth()->putJson('/api/blocks/executive-block', $payload);
        
        $response->assertStatus(422);
    }
}