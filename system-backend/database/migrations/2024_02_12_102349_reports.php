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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->date('reported_date')->nullable();
            $table->foreignId('user_id')->constrained('users','id')->nullable();
            $table->foreignId('location_id')->constrained('locations','id')->nullable();
            $table->integer('issue_status')->default(0);
            $table->foreignId('issue_type')->constrained('issue_types','id')->nullable();
            $table->foreignId('image_id')->constrained('images','id')->nullable();
            $table->string('votes')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
