<?php

namespace Tests\Feature;

use App\Support\PermissionRegistry;
use Tests\TestCase;
use App\Models\Plot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PlotControllerTest extends TestCase
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
        
        // Create test plots
        Plot::create([
            'id' => 'test-plot-1',
            'plot_number' => 'A-100',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '5 Marla',
            'dimensions' => '25 x 50',
            'price' => 6500000,
            'price_unit' => 'Total Price',
            'price_formatted' => 'PKR 65 Lacs',
            'price_history_trend' => '+5% in last month',
            'status' => 'Available',
            'facing' => 'Park Facing',
            'street' => 'Main Boulevard',
            'location' => 'Sector A',
            'map_coords' => ['x' => 50, 'y' => 50],
            'features' => ['Corner Plot', 'Park Facing'],
            'description' => 'Test plot 1',
            'image' => 'https://example.com/image1.jpg',
            'featured' => false,
            'display_order' => 1,
        ]);

        Plot::create([
            'id' => 'test-plot-2',
            'plot_number' => 'B-200',
            'block_slug' => 'block-b',
            'block_name' => 'Block B',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '10 Marla',
            'dimensions' => '35 x 70',
            'price' => 12000000,
            'price_unit' => 'Total Price',
            'price_formatted' => 'PKR 1.2 Crore',
            'price_history_trend' => '+8% in last month',
            'status' => 'Available',
            'facing' => 'Hill View',
            'street' => 'Grand Boulevard',
            'location' => 'Sector B',
            'map_coords' => ['x' => 60, 'y' => 40],
            'features' => ['Hill View', 'Elevated'],
            'description' => 'Test plot 2',
            'image' => 'https://example.com/image2.jpg',
            'featured' => true,
            'display_order' => 2,
        ]);

        Plot::create([
            'id' => 'test-plot-3',
            'plot_number' => 'EXE-300',
            'block_slug' => 'executive-block',
            'block_name' => 'Executive Block',
            'property_type' => 'Commercial',
            'category' => 'Commercial',
            'size' => '4 Marla Plaza Plot',
            'dimensions' => '30 x 30',
            'price' => 32000000,
            'price_unit' => 'Total Price',
            'price_formatted' => 'PKR 3.2 Crore',
            'price_history_trend' => '+18% commercial yield',
            'status' => 'Available',
            'facing' => 'Main Boulevard',
            'street' => 'GT Road',
            'location' => 'Executive Block',
            'map_coords' => ['x' => 70, 'y' => 30],
            'features' => ['Ground + 5 Approval', 'Main Road'],
            'description' => 'Commercial plot',
            'image' => 'https://example.com/image3.jpg',
            'featured' => true,
            'display_order' => 3,
        ]);
    }

    protected function withAuth(array $headers = []): self
    {
        return $this->withHeaders(array_merge([
            'Authorization' => 'Bearer ' . $this->token,
        ], $headers));
    }

    public function test_index_returns_all_plots_when_no_filters()
    {
        $response = $this->getJson('/api/plots');
        
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    public function test_index_filters_by_block()
    {
        $response = $this->getJson('/api/plots?block=block-a');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('block-a', $data[0]['block_slug']);
    }

    public function test_index_filters_by_property_type()
    {
        $response = $this->getJson('/api/plots?property_type=Residential');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(2, $data);
        $this->assertEquals('Residential', $data[0]['property_type']);
        $this->assertEquals('Residential', $data[1]['property_type']);
    }

    public function test_index_filters_by_category()
    {
        $response = $this->getJson('/api/plots?category=Commercial');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('Commercial', $data[0]['category']);
    }

    public function test_index_searches_by_plot_number()
    {
        $response = $this->getJson('/api/plots?search=A-100');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('A-100', $data[0]['plot_number']);
    }

    public function test_index_searches_by_size()
    {
        $response = $this->getJson('/api/plots?search=5 Marla');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('5 Marla', $data[0]['size']);
    }

    public function test_index_searches_by_block_name()
    {
        $response = $this->getJson('/api/plots?search=Executive');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('Executive Block', $data[0]['block_name']);
    }

    public function test_index_searches_by_facing()
    {
        $response = $this->getJson('/api/plots?search=Park');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('Park Facing', $data[0]['facing']);
    }

    public function test_index_orders_by_display_order_then_created_at()
    {
        $response = $this->getJson('/api/plots');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('test-plot-1', $data[0]['id']);
        $this->assertEquals('test-plot-2', $data[1]['id']);
        $this->assertEquals('test-plot-3', $data[2]['id']);
    }

    public function test_show_returns_plot_when_exists()
    {
        $response = $this->getJson('/api/plots/test-plot-1');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('test-plot-1', $data['id']);
        $this->assertEquals('A-100', $data['plot_number']);
    }

    public function test_show_returns_404_when_not_exists()
    {
        $response = $this->getJson('/api/plots/non-existent');
        
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Plot not found']);
    }

    public function test_store_creates_new_plot()
    {
        $payload = [
            'plot_number' => 'NEW-001',
            'block_slug' => 'block-c',
            'block_name' => 'Block C',
            'property_type' => 'Residential',
            'category' => 'Residential',
            'size' => '8 Marla',
            'dimensions' => '30 x 60',
            'price' => 8500000,
            'status' => 'Available',
            'facing' => 'Standard',
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(201);
        $data = $response->json();
        $this->assertEquals('NEW-001', $data['plot_number']);
        $this->assertEquals('block-c', $data['block_slug']);
        $this->assertEquals(8500000, $data['price']);
        
        $this->assertDatabaseHas('plots', ['plot_number' => 'NEW-001']);
    }

    public function test_store_converts_lacs_to_pkr()
    {
        $payload = [
            'plot_number' => 'LAC-TEST',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'size' => '5 Marla',
            'price' => 55, // 55 Lacs
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(201);
        $data = $response->json();
        $this->assertEquals(5500000, $data['price']);
    }

    public function test_store_converts_crores_to_pkr()
    {
        $payload = [
            'plot_number' => 'CRORE-TEST',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
            'size' => '1 Kanal',
            'price' => 1.5, // 1.5 Crore
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(201);
        $data = $response->json();
        $this->assertEquals(15000000, $data['price']);
    }

    public function test_store_requires_block_slug()
    {
        $payload = [
            'plot_number' => 'MISSING-BLOCK',
            'block_name' => 'Block A',
            'size' => '5 Marla',
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(422);
    }

    public function test_store_requires_block_name()
    {
        $payload = [
            'plot_number' => 'MISSING-BLOCK-NAME',
            'block_slug' => 'block-a',
            'size' => '5 Marla',
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(422);
    }

    public function test_store_requires_size()
    {
        $payload = [
            'plot_number' => 'MISSING-SIZE',
            'block_slug' => 'block-a',
            'block_name' => 'Block A',
        ];

        $response = $this->withAuth()->postJson('/api/plots', $payload);
        
        $response->assertStatus(422);
    }

    public function test_update_modifies_existing_plot()
    {
        $payload = [
            'price' => 7000000,
            'status' => 'Reserved',
        ];

        $response = $this->withAuth()->putJson('/api/plots/test-plot-1', $payload);
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals(7000000, $data['price']);
        $this->assertEquals('Reserved', $data['status']);
        
        $this->assertDatabaseHas('plots', ['id' => 'test-plot-1', 'price' => 7000000]);
    }

    public function test_update_recalculates_price_formatted()
    {
        $payload = [
            'price' => 15000000, // 1.5 Crore
        ];

        $response = $this->withAuth()->putJson('/api/plots/test-plot-1', $payload);
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertStringContainsString('1.50 Crore', $data['price_formatted']);
    }

    public function test_update_sets_price_history_trend()
    {
        // When price changes, diff is calculated against original price and trend is updated
        $payload = ['price' => 7800000];
        
        $response = $this->withAuth()->putJson('/api/plots/test-plot-1', $payload);
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals('+20.0% updated', $data['price_history_trend']);
    }

    public function test_update_returns_404_for_non_existent()
    {
        $response = $this->withAuth()->putJson('/api/plots/non-existent', ['price' => 1000000]);
        
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Plot not found']);
    }

    public function test_destroy_deletes_plot()
    {
        $response = $this->withAuth()->deleteJson('/api/plots/test-plot-1');
        
        $response->assertStatus(200);
        $response->assertJson(['message' => 'Plot deleted successfully']);
        
        $this->assertDatabaseMissing('plots', ['id' => 'test-plot-1']);
    }

    public function test_destroy_returns_404_for_non_existent()
    {
        $response = $this->withAuth()->deleteJson('/api/plots/non-existent');
        
        $response->assertStatus(404);
        $response->assertJson(['message' => 'Plot not found']);
    }

    public function test_multiple_filters_combined()
    {
        $response = $this->getJson('/api/plots?block=block-a&property_type=Residential');
        
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertCount(1, $data);
        $this->assertEquals('block-a', $data[0]['block_slug']);
        $this->assertEquals('Residential', $data[0]['property_type']);
    }

    public function test_empty_search_returns_all()
    {
        $response = $this->getJson('/api/plots?search=');
        
        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }
}