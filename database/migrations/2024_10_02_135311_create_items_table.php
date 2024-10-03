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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('category_id')->nullable();
            $table->string('contain_modify_grp_id')->nullable();
            $table->string('modified_grp_id')->nullable();
            $table->string('barcode')->nullable();
            $table->string('weight')->nullable();
            $table->decimal('price', 13, 2)->nullable();
            $table->double('inventory')->nullable();
            $table->string('sequence')->nullable();
            $table->string('availability')->nullable();
            $table->string('status')->nullable();
            $table->decimal('cost', 13, 2)->nullable();
            $table->string('noTax')->nullable();
            $table->string('NoDiscount')->nullable();
            $table->decimal('ta_price', 13, 2)->nullable();
            $table->decimal('reward_point', 13, 2)->nullable();
            $table->string('set_meal')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
