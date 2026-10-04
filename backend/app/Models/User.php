<?php

namespace App\Models;

use App\Support\PermissionRegistry;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'permissions' => 'array',
        ];
    }

    /**
     * Check if user is Super Admin
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

/**
 * Check if user account is active
 */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Whether this user may perform an action requiring $permission.
     *
     * Super administrators always pass. Everyone else must have the permission
     * explicitly granted, so an unrecognised, missing or empty permission set
     * grants nothing.
     */
    public function hasPermission(string $permission): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        if (! PermissionRegistry::exists($permission)) {
            return false;
        }

        return in_array($permission, $this->effectivePermissions(), true);
    }

    /**
     * Whether this user may perform an action requiring every listed permission.
     *
     * @param  array<int, string>  $permissions
     */
    public function hasAllPermissions(array $permissions): bool
    {
        foreach ($permissions as $permission) {
            if (! $this->hasPermission($permission)) {
                return false;
            }
        }

        return $permissions !== [];
    }

    /**
     * The permissions to send to the client.
     *
     * A super administrator is reported as holding everything, because that is
     * how the server treats them and the dashboard must not render a super
     * administrator as a restricted account.
     *
     * @return array<int, string>
     */
    public function effectivePermissions(): array
    {
        if ($this->isSuperAdmin()) {
            return PermissionRegistry::all();
        }

        return PermissionRegistry::sanitize($this->permissions);
    }

    /**
     * Stable, client-safe representation of the account for the dashboard.
     *
     * @return array<string, mixed>
     */
    public function toDashboardArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role ?? 'admin',
            'status' => $this->status ?? 'active',
            'permissions' => $this->effectivePermissions(),
        ];
    }
}
