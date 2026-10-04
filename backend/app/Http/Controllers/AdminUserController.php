<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\PermissionRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AdminUserController extends Controller
{
    /**
     * Display a listing of all administrators.
     */
    public function index(Request $request)
    {
        $users = User::select(['id', 'name', 'email', 'role', 'status', 'permissions', 'created_at', 'updated_at'])
            ->orderByRaw("CASE WHEN role = 'super_admin' THEN 0 ELSE 1 END")
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                // Reported through the registry so the client is never shown a
                // stored value the server would refuse to honour.
                'permissions' => $user->effectivePermissions(),
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);

        return response()->json([
            'success' => true,
            'users' => $users,
        ]);
    }

    /**
     * The permission catalogue the dashboard's grants UI renders.
     *
     * Served from the server so the picker can never offer a capability the API
     * would reject, which is what previously allowed arbitrary values into the
     * `permissions` column.
     */
    public function permissions()
    {
        return response()->json([
            'success' => true,
            'permissions' => PermissionRegistry::forApi(),
            'groups' => PermissionRegistry::grouped(),
        ]);
    }

    /**
     * Store a newly created administrator.
     */
    public function store(Request $request)
    {
        $this->validatePermissions($request);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required', 'string', 'confirmed', Password::min(8)],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'permissions' => ['nullable', 'array'],
        ]);

        // Strict server-side invariant: Any newly created admin is always assigned role = 'admin'
        $admin = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => 'admin',
            'status' => $request->input('status', 'active'),
            // Sanitised rather than stored verbatim, so an unrecognised value can
            // never reach the column that authorization decisions are made from.
            'permissions' => PermissionRegistry::sanitize($request->input('permissions', [])),
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Administrator account created successfully.',
            'user' => array_merge($admin->toDashboardArray(), [
                'created_at' => $admin->created_at,
            ]),
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

        $this->validatePermissions($request);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($targetUser->id)],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'password' => ['nullable', 'string', 'confirmed', Password::min(8)],
            'permissions' => ['nullable', 'array'],
        ]);

        $targetUser->name = $request->input('name');
        $targetUser->email = $request->input('email');
        $targetUser->status = $request->input('status');

        if ($request->has('permissions')) {
            $targetUser->permissions = PermissionRegistry::sanitize($request->input('permissions'));
        }

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
            'user' => array_merge($targetUser->toDashboardArray(), [
                'updated_at' => $targetUser->updated_at,
            ]),
        ]);
    }

    /**
     * Reject permission values the server does not recognise, and prevent an
     * actor from granting capabilities they do not themselves hold.
     *
     * Previously `permissions` was validated only as "is an array", so a client
     * could persist arbitrary values into the column that now drives
     * authorization. Failing loudly is better than silently dropping an unknown
     * key, because otherwise a superadmin could tick a box that has no effect
     * and believe an administrator had been restricted.
     *
     * The subset check closes a self-escalation path: an administrator holding
     * only `manage_users` could previously grant themselves — or any other
     * account — every permission, including ones they were never given. Only a
     * superadmin, who bypasses the check entirely, may grant the full set.
     */
    private function validatePermissions(Request $request): void
    {
        if (! $request->has('permissions')) {
            return;
        }

        $request->validate([
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', Rule::in(PermissionRegistry::all())],
        ], [
            'permissions.*.in' => 'Unknown permission. An administrator can only be granted capabilities the server recognises.',
        ]);

        $actor = $request->user();

        if ($actor === null || $actor->isSuperAdmin()) {
            return;
        }

        $requested = array_values(array_filter(
            (array) $request->input('permissions', []),
            'is_string'
        ));

        $escalation = array_values(array_diff($requested, $actor->effectivePermissions()));

        if ($escalation !== []) {
            throw ValidationException::withMessages([
                'permissions' => 'You cannot grant capabilities you do not hold yourself: '.implode(', ', $escalation).'.',
            ]);
        }
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
