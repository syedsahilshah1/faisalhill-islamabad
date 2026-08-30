<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AdminUserController extends Controller
{
    /**
     * Display a listing of all administrators.
     */
    public function index(Request $request)
    {
        $users = User::select(['id', 'name', 'email', 'role', 'status', 'created_at', 'updated_at'])
            ->orderByRaw("CASE WHEN role = 'super_admin' THEN 0 ELSE 1 END")
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created administrator.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required', 'string', 'confirmed', Password::min(8)],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ]);

        // Strict server-side invariant: Any newly created admin is always assigned role = 'admin'
        $admin = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => 'admin',
            'status' => $request->input('status', 'active'),
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Administrator account created successfully.',
            'user' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => $admin->role,
                'status' => $admin->status,
                'created_at' => $admin->created_at,
            ]
        ], 201);
    }

    /**
     * Update the specified administrator.
     */
    public function update(Request $request, $id)
    {
        $targetUser = User::findOrFail($id);

        // Immutable Super Admin Protection
        if ($targetUser->isSuperAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'The Super Admin account cannot be modified through the administrator management interface.'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($targetUser->id)],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'password' => ['nullable', 'string', 'confirmed', Password::min(8)],
        ]);

        $targetUser->name = $request->input('name');
        $targetUser->email = $request->input('email');
        $targetUser->status = $request->input('status');

        if ($request->filled('password')) {
            $targetUser->password = Hash::make($request->input('password'));
            // Revoke active sessions on password change
            $targetUser->tokens()->delete();
        }

        // If deactivated, revoke all active tokens immediately
        if ($targetUser->status === 'inactive') {
            $targetUser->tokens()->delete();
        }

        $targetUser->save();

        return response()->json([
            'success' => true,
            'message' => 'Administrator account updated successfully.',
            'user' => [
                'id' => $targetUser->id,
                'name' => $targetUser->name,
                'email' => $targetUser->email,
                'role' => $targetUser->role,
                'status' => $targetUser->status,
                'updated_at' => $targetUser->updated_at,
            ]
        ]);
    }

    /**
     * Toggle active/inactive status of an administrator.
     */
    public function toggleStatus(Request $request, $id)
    {
        $targetUser = User::findOrFail($id);

        // Immutable Super Admin Protection
        if ($targetUser->isSuperAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'The Super Admin account cannot be disabled.'
            ], 403);
        }

        $newStatus = $targetUser->status === 'active' ? 'inactive' : 'active';
        $targetUser->status = $newStatus;
        $targetUser->save();

        if ($newStatus === 'inactive') {
            // Immediately disconnect and revoke all access tokens
            $targetUser->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => "Administrator account has been {$newStatus}.",
            'status' => $newStatus
        ]);
    }

    /**
     * Remove the specified administrator.
     */
    public function destroy(Request $request, $id)
    {
        $targetUser = User::findOrFail($id);

        // Immutable Super Admin Protection
        if ($targetUser->isSuperAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'The permanent Super Admin account cannot be deleted under any circumstances.'
            ], 403);
        }

        // Prevent self-deletion
        if ($request->user()->id === $targetUser->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your own account.'
            ], 400);
        }

        // Revoke tokens and delete user
        $targetUser->tokens()->delete();
        $targetUser->delete();

        return response()->json([
            'success' => true,
            'message' => 'Administrator account deleted successfully.'
        ]);
    }
}
