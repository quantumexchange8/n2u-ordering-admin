<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'item_id',
        'quantity',
        'trans_price',
        'price_over_write',
        'discount_type',
        'discount_value',
        'discount_id',
        'remarks',
        'open_name',
        'transaction_id',
        'status',
        'order_weight',
        'void_id',
        'order_date',
        'void_date',
        'order_by',
        'void_by',
        'each_tax_amt',
        'order_bill_discount',
        'order_discount',
        'nett_price',
        'cost',
        'deleted_date',
        'course_id',
        'seat_no',
        'commission_id',
        'commission_amt',
        'commission_type',
        'commission_disc_yes',
        'pricing_level_id',
        'is_to_go',
        'kds_unique_id'
    ];
}
