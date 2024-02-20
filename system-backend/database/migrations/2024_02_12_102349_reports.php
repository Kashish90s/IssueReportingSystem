<?php

use App\Enums\IssueStatus;
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
            $table->text('description')->nullable();
            $table->date('reported_date')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users','id');
            $table->foreignId('location_id')->nullable()->constrained('locations','id');
            $table->integer('issue_status')->default(IssueStatus::Processing);
            $table->foreignId('issue_type')->nullable()->constrained('issue_types','id');
            $table->foreignId('image_id')->nullable()->constrained('images','id');
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
