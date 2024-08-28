<?php

namespace App\Http\Requests;

use App\Models\Voucher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VoucherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', Rule::unique(Voucher::class)],
            'point' => ['required'],
            'type' => ['required'],
            'amount' => [
                'required_if:discount,amount', // Required if discount is 'amount'
            ],
            'percent' => [
                'required_if:discount,percentage', // Required if discount is 'percentage'
            ],
            'rank' => ['required'],
            'discount' => ['required'],
            'description' => ['required'],
            'valid_type' => ['required'],
            'valid_from' => [
                'required_if:valid_type,period',
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Name',
            'point' => 'Point',
            'type' => 'Type',
            'amount' => 'amount',
            'percent' => 'percent',
            'rank' => 'rank',
            'discount' => 'discount',
            'description' => 'description',
            'valid_type' => 'Valid type',
            'valid_from' => 'valid date',
        ];
    }
}
