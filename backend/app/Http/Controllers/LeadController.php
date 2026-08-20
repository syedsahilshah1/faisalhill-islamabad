<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

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
