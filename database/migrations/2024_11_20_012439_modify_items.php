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
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn(['name', 'description', 'category_id', 'contain_modify_grp_id', 'modified_grp_id', 'barcode', 'weight', 'price', 'inventory', 'sequence', 'availability', 'status', 'cost', 'noTax', 'NoDiscount', 'ta_price', 'reward_point', 'set_meal', 'created_at', 'updated_at']);

            $table->string('item_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('category_id');
            $table->string('parent_item_id')->nullable();
            $table->string('contain_item_id')->nullable();
            $table->string('contain_mod_group_id')->nullable();
            $table->string('modifier_group_id')->nullable();
            $table->string('barcode_no')->nullable();
            $table->string('weight')->nullable();
            $table->decimal('price', 13, 2)->nullable();
            $table->string('inventory')->nullable();
            $table->string('member_owner')->nullable();
            $table->longText('image')->nullable();
            $table->string('assigned_printer')->nullable();
            $table->string('sequence')->nullable();
            $table->string('availability')->nullable();
            $table->string('status')->nullable();
            $table->decimal('cost', 13, 4)->nullable();
            $table->string('no_tax')->nullable();
            $table->string('no_discount')->nullable();
            $table->decimal('ta_price', 13, 2)->nullable();
            $table->decimal('reward_points', 13, 2)->nullable();
            $table->string('open_price')->nullable();
            $table->string('color')->nullable();
            $table->string('track_inventory')->nullable();
            $table->string('commission_disc_yes')->nullable();
            $table->string('base_uom')->nullable();
            $table->string('alternate_uom')->nullable();
            $table->string('contain_set_meal_group_id')->nullable();
            $table->string('item_code')->nullable();
            $table->string('is_variant')->nullable();
            $table->string('variant_child')->nullable();
            $table->string('hidden')->nullable();
            $table->string('no_rewards')->nullable();
            $table->string('default_quantity')->nullable();
            $table->timestamps();

    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
