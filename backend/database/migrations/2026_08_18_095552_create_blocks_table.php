<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blocks', function (Blueprint $table) {
            $table->string('id')->primary(); // we will use the string ID like 'executive-block'
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('subtitle')->nullable();
            $table->string('category'); // developed, upcoming, commercial_project
            $table->string('status');
            $table->string('noc_status');
            $table->string('verification_date');
            $table->text('description')->nullable();
            $table->text('location_details')->nullable();
            $table->json('highlights')->nullable();
            $table->integer('total_plots')->default(0);
            $table->json('price_range')->nullable(); // { residential: '...', commercial: '...' }
            $table->string('master_plan_image')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('amenities')->nullable();
            $table->json('faqs')->nullable();
            $table->json('development_updates')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocks');
    }
};
