<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = env('SUPER_ADMIN_EMAIL', 'ubaidnasir147.un@gmail.com');
        $initialPassword = env('SUPER_ADMIN_INITIAL_PASSWORD', 'admin123');

        // Delete any old redundant placeholder accounts
        User::where('email', 'ubaid@faisalhills.com')->delete();

        $superAdmin = User::where('email', $email)->orWhere('role', 'super_admin')->first();

        if ($superAdmin) {
            $superAdmin->email = $email;
            $superAdmin->name = 'ubaid';
            $superAdmin->password = Hash::make($initialPassword);
            $superAdmin->role = 'super_admin';
            $superAdmin->status = 'active';
            $superAdmin->email_verified_at = now();
            $superAdmin->save();
        } else {
            User::create([
                'name' => 'ubaid',
                'email' => $email,
                'password' => Hash::make($initialPassword),
                'role' => 'super_admin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
        }
    }
}

