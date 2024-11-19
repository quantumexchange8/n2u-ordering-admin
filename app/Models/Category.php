<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'name',
        'image',
        'assigned_printer',
        'sequence',
        'status',
        'availability',
        'auto_discount',
        'accessible',
        'course_setting_id',
        'contain_mod_group_id',
        'reporting_category_id',
        'description'
    ];


}
