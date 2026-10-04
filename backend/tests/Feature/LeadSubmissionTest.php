<?php

namespace Tests\Feature;

use App\Http\Controllers\LeadController;
use App\Models\Lead;
use App\Models\User;
use App\Support\PermissionRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Lead submission, storage and notification.
 *
 * The gap this file exists for: `LeadController::store` validated an `email`
 * field and used it as a fallback source for the name and phone, but the `leads`
 * table had no `email` column and the model did not list it as fillable. The
 * value was accepted and silently thrown away, so an enquiry submitted with an
 * address could not be answered by email and the dashboard never showed one.
 */
class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::create([
            'name' => 'Lead Test Admin',
            'email' => 'lead-admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'status' => 'active',
            'permissions' => [PermissionRegistry::LEADS],
        ]);
    }

    public function test_a_lead_with_an_email_persists_that_email()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'name' => 'Overseas Buyer',
            'phone' => '+92 300 1234567',
            'email' => 'buyer@example.com',
            'interest' => 'Plot Inventory Enquiry',
            'message' => 'Looking for 5 Marla in Block A',
        ])->assertCreated();

        $lead = Lead::first();

        $this->assertNotNull($lead, 'The lead was not stored');
        $this->assertSame('buyer@example.com', $lead->email);
        $this->assertSame('Plot Inventory Enquiry', $lead->interest);
    }

    public function test_the_notification_email_includes_the_address()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'name' => 'Overseas Buyer',
            'phone' => '+92 300 1234567',
            'email' => 'buyer@example.com',
            'interest' => 'Plot Inventory Enquiry',
        ])->assertCreated();

        // Asserted against the body builder rather than through `Mail::fake()`.
        // `MailFake::raw()` is an intentional no-op, so a raw message is never
        // recorded and `Mail::assertSent()` cannot see it — an assertion built on
        // it would silently pass or fail for reasons unrelated to the content.
        $body = (new LeadController())->buildNotificationBody(Lead::first());

        // Sales needs the address in the notification itself, not only after
        // logging into the dashboard.
        $this->assertStringContainsString('buyer@example.com', $body);
        $this->assertStringContainsString('Plot Inventory Enquiry', $body);
    }

    public function test_the_notification_omits_the_email_line_when_there_is_none()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'name' => 'Local Buyer',
            'phone' => '0300-7654321',
        ])->assertCreated();

        $body = (new LeadController())->buildNotificationBody(Lead::first());

        // A blank "Email:" row reads like a capture bug, so it is omitted
        // entirely rather than printed empty.
        $this->assertStringNotContainsString('Email:', $body);
        $this->assertStringContainsString('0300-7654321', $body);
    }

    public function test_a_phone_only_lead_is_still_accepted()
    {
        Mail::fake();

        // Most local enquiries give a number and nothing else. The column is
        // nullable so this must not start failing.
        $this->postJson('/api/leads', [
            'name' => 'Local Buyer',
            'phone' => '0300-7654321',
            'interest' => 'General Inquiry',
        ])->assertCreated();

        $this->assertNull(Lead::first()->email);
    }

    public function test_the_name_falls_back_to_the_email_local_part()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'email' => 'nameless-buyer@example.com',
        ])->assertCreated();

        $this->assertSame('nameless-buyer', Lead::first()->name);
    }

    public function test_a_submitted_lead_is_visible_to_the_dashboard()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'name' => 'Dashboard Reader',
            'phone' => '+92 333 1113177',
            'email' => 'reader@example.com',
            'interest' => 'Homepage Plot Enquiry (Block A)',
        ])->assertCreated();

        $token = $this->admin()->createToken('test')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->getJson('/api/leads');

        $response->assertOk();

        $body = $response->json();
        $this->assertCount(1, $body);

        $row = $body[0];
        $this->assertSame('Dashboard Reader', $row['name']);
        $this->assertSame('reader@example.com', $row['email']);
    }

    public function test_a_malformed_email_is_rejected()
    {
        Mail::fake();

        $this->postJson('/api/leads', [
            'name' => 'Bad Address',
            'phone' => '+92 300 1234567',
            'email' => 'not-an-email',
        ])->assertStatus(422);

        $this->assertSame(0, Lead::count());
    }
}
