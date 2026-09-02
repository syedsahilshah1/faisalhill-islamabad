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
        return response()->json(Lead::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'interest' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        $lead = Lead::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'interest' => $validated['interest'] ?? 'General Inquiry',
            'message' => $validated['message'] ?? '',
            'submitted_at' => 'Today, ' . now()->format('h:i A'),
        ]);

        // Send email alert to Superadmin(s)
        try {
            $superAdmins = User::where('role', 'super_admin')->pluck('email')->filter()->toArray();
            
            if (empty($superAdmins)) {
                $defaultAdmin = env('MAIL_FROM_ADDRESS', 'info@faisalhillsislamabadfh.com');
                $superAdmins = [$defaultAdmin];
            }

            $emailBody = "🔔 New Lead Inquiry Received on Faisal Hills Portal\n\n"
                . "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
                . "👤 Name: " . $lead->name . "\n"
                . "📞 Phone: " . $lead->phone . "\n"
                . "📌 Interest: " . $lead->interest . "\n"
                . "💬 Message: " . ($lead->message ?: 'No additional message') . "\n"
                . "⏰ Date/Time: " . now()->format('d M Y, h:i A') . "\n"
                . "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
                . "Login to your admin panel to view all inquiries.";

            Mail::raw($emailBody, function ($message) use ($superAdmins, $lead) {
                $message->to($superAdmins)
                        ->subject("🔔 New Lead Inquiry: " . $lead->name . " (" . $lead->interest . ")");
            });
        } catch (\Exception $e) {
            Log::error('Lead notification email failed: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'lead' => $lead,
            'message' => 'Inquiry submitted successfully!'
        ], 201);
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

