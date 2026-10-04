<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds `email` to the leads table.
 *
 * `LeadController::store` already validated an `email` field and even used it as
 * a fallback source for the name and phone, but the column did not exist and was
 * not in the model's `$fillable`, so the value was accepted and then silently
 * discarded. A lead form that asks for an email address has to be able to keep
 * it — otherwise sales follow up by phone only and overseas enquiries, which
 * usually arrive by email, lose their only contact route.
 *
 * Nullable and added in place: existing rows have no address to backfill.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('leads', 'email')) {
            return;
        }

        Schema::table('leads', function (Blueprint $table) {
            $table->string('email')->nullable()->after('phone');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('leads', 'email')) {
            return;
        }

        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }
};
