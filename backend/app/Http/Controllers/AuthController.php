<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Authenticate user and issue Sanctum token
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);

            $throttleKey = Str::transliterate(Str::lower($request->input('username')) . '|' . $request->ip());

            if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
                $seconds = RateLimiter::availableIn($throttleKey);
                return response()->json([
                    'success' => false,
                    'message' => "Too many login attempts. Please try again in {$seconds} seconds."
                ], 429);
            }

            // Support logging in by name (username) or email
            $user = User::where('name', $request->username)
                ->orWhere('email', $request->username)
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                RateLimiter::hit($throttleKey, 300);
                return response()->json([
                    'success' => false,
                    'message' => 'The provided credentials do not match our records.'
                ], 422);
            }

            // Check if account is active
            if (!$user->isActive()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This administrator account has been deactivated. Please contact the Super Admin.'
                ], 403);
            }

            RateLimiter::clear($throttleKey);

            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'admin',
                    'status' => $user->status ?? 'active',
                ],
                'message' => 'Successfully logged in'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Server Error: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Terminate current session token
     */
    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Retrieve authenticated user profile
     */
    public function user(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ?? 'admin',
                'status' => $user->status ?? 'active',
            ]
        ]);
    }

    /**
     * Change authenticated user's password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => ['required', 'string', 'confirmed', Password::min(8)],
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password provided is incorrect.'],
            ]);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.'
        ]);
    }

    /**
     * Initiate password reset flow via email
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');
        $throttleKey = 'forgot-password|' . Str::lower($email) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 3)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'success' => false,
                'message' => "Too many reset requests. Please wait {$seconds} seconds before trying again."
            ], 429);
        }

        RateLimiter::hit($throttleKey, 600);

        $user = User::where('email', $email)->first();

        // Always return generic success response to prevent email enumeration
        if ($user && $user->isActive()) {
            $rawToken = Str::random(64);
            $hashedToken = hash('sha256', $rawToken);

            // Store token in standard password_reset_tokens table
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $email],
                [
                    'token' => $hashedToken,
                    'created_at' => Carbon::now()
                ]
            );

            $frontendUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/');
            $resetUrl = "{$frontendUrl}/reset-password?token={$rawToken}&email=" . urlencode($email);

            try {
                Mail::to($user->email)->send(new ResetPasswordMail($resetUrl, $user->name));
            } catch (\Exception $e) {
                // Log mail exception if necessary without exposing to client
                \Illuminate\Support\Facades\Log::error('Password reset email failure: ' . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'If an account exists for this email, a password reset link has been sent.'
        ]);
    }

    /**
     * Complete password reset using token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => ['required', 'string', 'confirmed', Password::min(8)],
        ]);

        $email = $request->input('email');
        $rawToken = $request->input('token');
        $hashedToken = hash('sha256', $rawToken);

        $record = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->first();

        if (!$record || !hash_equals($record->token, $hashedToken)) {
            return response()->json([
                'success' => false,
                'message' => 'This password reset link is invalid or has already been used.'
            ], 400);
        }

        // Verify token is within 60 minutes
        $createdAt = Carbon::parse($record->created_at);
        if ($createdAt->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return response()->json([
                'success' => false,
                'message' => 'This password reset link has expired. Please request a new one.'
            ], 400);
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User associated with this reset link could not be found.'
            ], 404);
        }

        // Update password & delete used token
        $user->password = Hash::make($request->password);
        $user->save();

        // Invalidate reset token (single-use)
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        // Revoke any previous API tokens
        $user->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully. You may now log in with your new credentials.'
        ]);
    }
}
