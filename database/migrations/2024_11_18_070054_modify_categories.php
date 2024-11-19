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
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['name', 'status', 'quick_key', 'modified_grp_id', 'report_cat_id', 'description']);

            $table->string('category_id');
            $table->string('name');
            $table->longText('image')->nullable();
            $table->string('assigned_printer');
            $table->string('sequence');
            $table->string('status');
            $table->string('availability');
            $table->string('auto_discount')->nullable();
            $table->string('accessible')->nullable();
            $table->string('course_setting_id')->nullable();
            $table->string('contain_mod_group_id')->nullable();
            $table->string('reporting_category_id')->nullable();
            $table->string('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name');
            $table->string('status');
            $table->string('quick_key');
            $table->string('contain_modify_grp_id');
            $table->string('report_cat_id');
            $table->string('description');
            // Drop newly added columns
            $table->dropColumn(['category_id', 'image', 'assigned_printer', 'sequence', 'status', 'availability', 'auto_discount', 'accessible', 'course_setting_id','contain_mod_group_id', 'reporting_category_id', 'description']);
        });
    }
};
