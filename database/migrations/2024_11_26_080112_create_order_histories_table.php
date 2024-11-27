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
        Schema::create('order_histories', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->nullable();
            $table->string('item_id')->nullable();
            $table->string('quantity')->nullable();
            $table->decimal('trans_price', 13, 2)->nullable();
            $table->decimal('price_over_write', 13, 2)->nullable();
            $table->string('discount_type')->nullable();
            $table->decimal('discount_value', 13, 2)->nullable();
            $table->string('discount_id')->nullable();
            $table->string('remarks')->nullable();
            $table->string('open_name')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('status')->nullable();
            $table->string('order_weight', 13, 4)->nullable();
            $table->string('void_id')->nullable();
            $table->dateTime('order_date')->nullable();
            $table->dateTime('void_date')->nullable();
            $table->string('order_by')->nullable();
            $table->string('void_by')->nullable();
            $table->string('each_tax_amt')->nullable();
            $table->decimal('order_bill_discount', 13, 4)->nullable();
            $table->decimal('order_discount', 13, 4)->nullable();
            $table->decimal('nett_price', 13, 4)->nullable();
            $table->decimal('cost', 13, 4)->nullable();
            $table->dateTime('deleted_date')->nullable();
            $table->string('course_id')->nullable();
            $table->string('seat_no')->nullable();
            $table->string('commission_id')->nullable();
            $table->decimal('commission_amt', 13, 2)->nullable();
            $table->string('commission_type')->nullable();
            $table->string('commission_disc_yes')->nullable();
            $table->string('pricing_level_id')->nullable();
            $table->string('is_to_go')->nullable();
            $table->string('kds_unique_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_histories');
    }
};
