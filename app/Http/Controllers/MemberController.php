<?php

namespace App\Http\Controllers;

use App\Models\PointLog;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function memberListing()
    {

        return Inertia::render('Member/MemberListing');
    }

    public function getMemberDetails()
    {

        $member = User::where('role', 'member')->with(['rank:id,name'])->get();

        return response()->json($member);
    }

    public function getMemberJoined(Request $request)
    {

        $member = User::query()
            ->where('role', 'member')
            ->get();


        return response()->json($member);
    }

    public function memberDetails($id)
    {

        $user = User::with(['rank', 'upline'])->find($id);

        $cashWallet = Wallet::where('type', 'cash_wallet')->where('user_id', $id)->first();
        $dineWallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $id)->first();

        $transaction = Transaction::where('user_id', $id)->with(['user:id,name'])->get();
        
        return Inertia::render('Member/Partials/MemberDetails', [
            'user' => $user,
            'cashWallet' => $cashWallet,
            'dineWallet' => $dineWallet,
            'transaction' => $transaction,
        ]);
    }

    public function updateMemberWallet(Request $request)
    {
        
        $user = User::find($request->id);
        $cashWallet = Wallet::where('type', 'cash_wallet')->where('user_id', $user->id)->first();
        $dineWallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $user->id)->first();
        $oldBalance = $dineWallet->balance;

        if ($request->dine_in_wallet !== $dineWallet->balance) {
            
            $dineWallet->update([
                'balance' => $request->dine_in_wallet,
            ]);

            $transaction = Transaction::create([
                'user_id' => $user->id,
                'transaction_type' => 'Deposit',
                'wallet' => 'dine_in_wallet',
                'amount' => $dineWallet->balance - $oldBalance,
                'transaction_number' => RunningNumberService::getID('transaction'),
                'payment_type' => 'manual',
                'status' => 'success',
                'handle_by' => Auth::user()->id,
                'remark' => 'Admin deposit',
                'transaction_date' => now(),
            ]);
        }

        if ($request->cash_wallet != $cashWallet->balance) {
            $cashWallet->update([
                'balance' => $request->cash_wallet,
            ]);
        }

        if ($request->point != null) {

            $user->point += $request->point;
            $user->save();

            $pointLog = PointLog::create([
                'user_id' => $user->id,
                'type' => 'earned',
                'amount' => $request->point,
                'earning_point' => $request->point,
                'old_point' => $request->point_balance,
                'new_point' => $user->point,
            ]);
            
        }

        return redirect()->back();
    }

    public function updateMemberProfile(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',  
            ],            
        ]);
        
        $user = User::find($request->id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'dob' => $request->dob,
            'gender' => $request->gender,
            'member_id' => $request->member_id,
            'address1' => $request->address1,
            'address2' => $request->address2,
            'address3' => $request->address3,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
        ]);

        return redirect()->back();
    }

    public function deleteMember(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();

        return redirect()->back();
    }
}
