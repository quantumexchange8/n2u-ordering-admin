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
        Schema::create('clock_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('staff_id');
            $table->dateTime('clock_in');
            $table->dateTime('clock_out');
            $table->unsignedBigInteger('account_id');
            $table->string('remark');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clock_logs');
    }
};
