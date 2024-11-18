<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'user_id',
        'receipt_no',
        'receipt_start',
        'receipt_end',
        'receipt_total',
        'receipt_grand_total',
        'rounding',
        'discount_type',
        'discount_amount',
        'discount_receipt_amount',
        'discount_id',
        'discount_item',
        'tip_type',
        'tip_amount',
        'tip_receipt_amount',
        'change',
        'table_id',
        'pax_no',
        'trans_by',
        'cust_name',
        'phone_no',
        'cust_id',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'cust_id', 'customer_id');
    }
}
