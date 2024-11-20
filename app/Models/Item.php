<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
    'item_id',
    'name',
    'description',
    'category_id',
    'parent_item_id',
    'contain_item_id',
    'contain_mod_group_id',
    'modifier_group_id',
    'barcode_no',
    'weight',
    'price',
    'inventory',
    'member_owner',
    'image',
    'assigned_printer',
    'sequence',
    'availability',
    'status',
    'cost',
    'no_tax',
    'no_discount',
    'ta_price',
    'reward_points',
    'open_price',
    'color',
    'track_inventory',
    'commission_disc_yes',
    'base_uom',
    'alternate_uom',
    'contain_set_meal_group_id',
    'item_code',
    'is_variant',
    'variant_child',
    'hidden',
    'no_rewards',
    'default_quantity'
    ];
}
