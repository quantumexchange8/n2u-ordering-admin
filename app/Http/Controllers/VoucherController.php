<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoucherRequest;
use App\Models\Ranking;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    public function voucherListing()
    {

        $rank = Ranking::get();

        return Inertia::render('Voucher/VoucherListing', [
            'rank' => $rank,
        ]);
    }

    public function addVoucher(VoucherRequest $request)
    {
        
        $rank = Ranking::where('name', $request->rank)->first();
        
        $validFrom = $request->valid_from[0];
        $validFrom = Carbon::parse($validFrom, 'UTC') // Assume the date is in UTC
                    ->setTimezone('Asia/Kuala_Lumpur') // Set to Malaysia Time
                    ->format('Y-m-d H:i:s');
        
        $validTo = $request->valid_from[1];
        $validTo = Carbon::parse($validTo, 'UTC')->setTimezone('Asia/Kuala_Lumpur')->format('Y-m-d H:i:s');


        $voucher = Voucher::create([
            'name' => $request->name,
            'point' => $request->point,
            'type' => $request->type,
            'value' => $request->amount ?? $request->percent,
            'status' => 'active',
            'rank_id' => $rank->id,
            'description' => $request->description,
            'discount_type' => $request->discount,
            'valid_type' => $request->valid_type,
            'valid_from' => $validFrom,
            'valid_to' => $validTo,
        ]);

        return redirect()->back();
    }

    public function getAllVoucher()
    {

        $voucher = Voucher::query()
                ->get();

        return response()->json($voucher);
    }

    public function updateVoucher(Request $request)
    {
        $voucher = Voucher::find($request->id);
        
        $rank = Ranking::where('name', $request->rank)->first();
        
        if ($request->name != null) {
            $voucher->name = $request->name;
            $voucher->save();
        }
        if ($request->point != null) {
            $voucher->point = $request->point;
            $voucher->save();
        }
        if ($request->type != null) {
            $voucher->type = $request->type;
            $voucher->save();
        }
        if ($request->amount != null) {
            $voucher->value = $request->amount;
            $voucher->save();
        }
        if ($request->percent != null) {
            $voucher->value = $request->percent;
            $voucher->save();
        }
        if ($request->rank != null) {
            $voucher->rank_id = $rank->id;
            $voucher->save();
        }
        if ($request->discount != null) {
            $voucher->discount_type = $request->discount;
            $voucher->save();
        }
        if ($request->valid_type != null) {
            $voucher->valid_type = $request->valid_type;
            $voucher->save();
        }
        
        if ($request->valid_from != null) {
            
            $validFrom = $request->valid_from[0];
            $validFrom = Carbon::parse($validFrom, 'UTC') 
                    ->setTimezone('Asia/Kuala_Lumpur')
                    ->format('Y-m-d H:i:s');

            $validTo = $request->valid_from[1];
            $validTo = Carbon::parse($validTo, 'UTC')
                    ->setTimezone('Asia/Kuala_Lumpur')
                    ->format('Y-m-d H:i:s');

            $voucher->valid_from = $validFrom;
            $voucher->valid_to = $validTo;
            $voucher->save();
        }

        return redirect()->back();
    }

    public function deleteVoucher(Request $request) 
    {
        $voucher = Voucher::find($request->id);
        $voucher->delete();

        return redirect()->back();
    }
}
