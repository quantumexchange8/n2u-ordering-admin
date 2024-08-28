<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'point',
        'type',
        'value',
        'status',
        'rank_id',
        'description',
        'discount_type',
        'valid_type',
        'valid_from',
        'valid_to',
    ];
}
