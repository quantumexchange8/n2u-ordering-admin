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
        Schema::create('transaction_histories', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->nullable();
            $table->string('user_id')->nullable();
            $table->string('receipt_no')->nullable();
            $table->dateTime('receipt_start')->nullable();
            $table->dateTime('receipt_end')->nullable();
            $table->decimal('receipt_total', 13, 2)->nullable();
            $table->decimal('receipt_grand_total', 13, 2)->nullable();
            $table->decimal('rounding', 13, 2)->nullable();
            $table->string('discount_type')->nullable();
            $table->decimal('discount_amount', 13, 2)->nullable();
            $table->decimal('discount_receipt_amount', 13, 2)->nullable();
            $table->string('discount_id')->nullable();
            $table->string('discount_item')->nullable();
            $table->string('tip_type')->nullable();
            $table->decimal('tip_amount', 13, 2)->nullable();
            $table->decimal('tip_receipt_amount', 13, 2)->nullable();
            $table->decimal('change', 13, 2)->nullable();
            $table->string('table_id')->nullable();
            $table->string('pax_no')->nullable();
            $table->string('trans_by')->nullable();
            $table->string('cust_name')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('customer_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_histories');
    }
};
