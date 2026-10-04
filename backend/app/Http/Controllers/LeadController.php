<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::orderBy('created_at', 'desc')->get()->map(function ($lead) {
            if ($lead->created_at) {
                $lead->submitted_at = $lead->created_at->format('d M Y, h:i A');
            } elseif (empty($lead->submitted_at) || str_starts_with($lead->submitted_at, 'Today') || str_starts_with($lead->submitted_at, 'Yesterday')) {
                $lead->submitted_at = now()->format('d M Y, h:i A');
            }
            return $lead;
        });

        return response()->json($leads);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:255',
            'interest' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $name = !empty($validated['name']) ? $validated['name'] : (!empty($validated['email']) ? explode('@', $validated['email'])[0] : 'Newsletter Subscriber');
        $phone = !empty($validated['phone']) ? $validated['phone'] : (!empty($validated['email']) ? $validated['email'] : 'N/A');

        $lead = Lead::create([
            'name' => $name,
            'phone' => $phone,
            // Persisted rather than only validated: the dashboard and the
            // notification email both read it, and an enquiry that arrived by
            // email would otherwise have no address on file to reply to.
            'email' => $validated['email'] ?? null,
            'interest' => $validated['interest'] ?? 'General Inquiry',
            'message' => $validated['message'] ?? '',
            'submitted_at' => now()->format('d M Y, h:i A'),
        ]);

        $lead->submitted_at = $lead->created_at ? $lead->created_at->format('d M Y, h:i A') : now()->format('d M Y, h:i A');

        // Send email alert to Superadmin(s) only for direct lead inquiries (skip newsletter subscriptions)
        $isNewsletter = stripos($lead->interest, 'newsletter') !== false;

        if (!$isNewsletter) {
            try {
                $superAdmins = User::where('role', 'super_admin')->pluck('email')->filter()->toArray();
                
                if (empty($superAdmins)) {
                    $defaultAdmin = env('MAIL_FROM_ADDRESS', 'info@faisalhillsislamabadfh.com');
                    $superAdmins = [$defaultAdmin];
                }

                $subject = "🔔 New Lead Inquiry: " . $lead->name . " (" . $lead->interest . ")";
                $emailBody = $this->buildNotificationBody($lead);

                Mail::raw($emailBody, function ($message) use ($superAdmins, $subject) {
                    $message->to($superAdmins)
                            ->subject($subject);
                });
            } catch (\Exception $e) {
                Log::error('Lead notification email failed: ' . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'lead' => $lead,
            'message' => 'Inquiry submitted successfully!'
        ], 201);
    }

    /**
     * Body of the "new lead" notification sent to the super admins.
     *
     * Extracted from `store()` because it is the only place the notification's
     * contents are decided, and it was previously unreachable from a test:
     * `MailFake::raw()` is a deliberate no-op, so `Mail::fake()` records nothing
     * and `Mail::assertSent()` cannot observe this message at all. With the body
     * built by a method, its contents can be asserted directly.
     */
    public function buildNotificationBody(Lead $lead): string
    {
        return "🔔 New Lead Inquiry Received on Faisal Hills Portal\n\n"
            . "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            . "👤 Name: " . $lead->name . "\n"
            . "📞 Phone / Contact: " . $lead->phone . "\n"
            // Only printed when supplied, so a phone-only enquiry does not
            // produce a blank line in the notification.
            . ($lead->email ? "✉️ Email: " . $lead->email . "\n" : "")
            . "📌 Interest: " . $lead->interest . "\n"
            . "💬 Message: " . ($lead->message ?: 'No additional message') . "\n"
            . "⏰ Date/Time: " . now()->format('d M Y, h:i A') . "\n"
            . "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
            . "Login to your admin panel to view all inquiries.";
    }

    public function destroy(int $id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['message' => 'Lead not found'], 404);
        }

        $lead->delete();

        return response()->json(['message' => 'Lead inquiry deleted successfully']);
    }
}

