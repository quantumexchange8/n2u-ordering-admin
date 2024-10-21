<?php

namespace App\Http\Controllers;

use App\Models\PointLog;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        
        $request->validate([
            'wallet_type' => ['required'],
            'bal_type' => ['required'],
        ]);

        $user = User::find($request->id);
        $cashWallet = Wallet::where('type', 'cash_wallet')->where('user_id', $user->id)->first();
        $dineWallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $user->id)->first();
        $oldBalance = $dineWallet->balance;
        $oldCashBalance = $cashWallet->balance;
        $oldPointBal = $user->point;

        if ($request->wallet_type === 'Dine In Wallet') {
            $request->validate([
                'amount' => ['required', 'numeric', 'min:1'],
            ]);

            if ($request->bal_type === 'Deposit') {
                $dineWallet->update([
                    'balance' => $dineWallet->balance += $request->amount,
                ]);

                $transaction = Transaction::create([
                    'user_id' => $user->id,
                    'transaction_type' => 'Adjustment',
                    'adjustment_type' => $request->bal_type,
                    'wallet' => 'dine_in_wallet',
                    'old_balance' => $oldBalance,
                    'amount' => $request->amount,
                    'transaction_number' => RunningNumberService::getID('transaction'),
                    'payment_type' => 'manual',
                    'status' => 'success',
                    'handle_by' => Auth::user()->id,
                    'remark' => 'Admin adjustment',
                    'transaction_date' => now(),
                ]);
            }

            if ($request->bal_type === 'Withdrawal') {
                $dineWallet->update([
                    'balance' => $dineWallet->balance -= $request->amount,
                ]);

                $transaction = Transaction::create([
                    'user_id' => $user->id,
                    'transaction_type' => 'Adjustment',
                    'adjustment_type' => $request->bal_type,
                    'wallet' => 'dine_in_wallet',
                    'old_balance' => $oldBalance,
                    'amount' => $request->amount,
                    'transaction_number' => RunningNumberService::getID('transaction'),
                    'payment_type' => 'manual',
                    'status' => 'success',
                    'handle_by' => Auth::user()->id,
                    'remark' => 'Admin adjustment',
                    'transaction_date' => now(),
                ]);
            }
        }

        if ($request->wallet_type === 'Credit Wallet') {
            $request->validate([
                'amount' => ['required', 'numeric', 'min:1'],
            ]);

            if ($request->bal_type === 'Deposit') {
                $cashWallet->update([
                    'balance' => $cashWallet->balance += $request->amount,
                ]);

                $transaction = Transaction::create([
                    'user_id' => $user->id,
                    'transaction_type' => 'Adjustment',
                    'adjustment_type' => $request->bal_type,
                    'wallet' => 'cash_wallet',
                    'old_balance' => $oldBalance,
                    'amount' => $request->amount,
                    'transaction_number' => RunningNumberService::getID('transaction'),
                    'payment_type' => 'manual',
                    'status' => 'success',
                    'handle_by' => Auth::user()->id,
                    'remark' => 'Admin adjustment',
                    'transaction_date' => now(),
                ]);
            }

            if ($request->bal_type === 'Withdrawal') {
                $cashWallet->update([
                    'balance' => $cashWallet->balance -= $request->amount,
                ]);

                $transaction = Transaction::create([
                    'user_id' => $user->id,
                    'transaction_type' => 'Adjustment',
                    'adjustment_type' => $request->bal_type,
                    'wallet' => 'cash_wallet',
                    'old_balance' => $oldBalance,
                    'amount' => $request->amount,
                    'transaction_number' => RunningNumberService::getID('transaction'),
                    'payment_type' => 'manual',
                    'status' => 'success',
                    'handle_by' => Auth::user()->id,
                    'remark' => 'Admin adjustment',
                    'transaction_date' => now(),
                ]);
            }
        }

        if ($request->wallet_type === 'Point') {
            $request->validate([
                'point' => ['required', 'numeric', 'min:1'],
            ]);

            if ($request->bal_type === "Deposit") {
                
                $user->point += $request->point;
                $user->save();

                $pointLog = PointLog::create([
                    'user_id' => $user->id,
                    'type' => 'adjustment',
                    'amount' => $request->point,
                    'earning_point' => $request->point,
                    'old_point' => $oldPointBal,
                    'new_point' => $user->point,
                    'remark' => 'admin adjustment',
                    'adjust_type' => $request->bal_type,
                ]);

            }

            if ($request->bal_type === "Withdrawal") {
                
                $user->point -= $request->point;
                $user->save();

                $pointLog = PointLog::create([
                    'user_id' => $user->id,
                    'type' => 'adjustment',
                    'amount' => $request->point,
                    'earning_point' => $request->point,
                    'old_point' => $oldPointBal,
                    'new_point' => $user->point,
                    'remark' => 'admin adjustment',
                    'adjust_type' => $request->bal_type,
                ]);
            }
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

    public function getUserDetails(Request $request)
    {
        $userDetails = User::find($request->user_id);
        
        return response()->json($userDetails);
    }

    public function getUserTransaction(Request $request)
    {
        $transaction = Transaction::where('user_id', $request->user_id)->with(['user:id,name'])->get();

        return response()->json($transaction);
    }

    public function getUserWallet(Request $request)
    {

        $wallet = Wallet::where('user_id', $request->user_id)->get();

        return response()->json($wallet);
    }

    public function updateMemberPassword(Request $request)
    {

        $request->validate([
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::find($request->id);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back();
    }

    public function updateMemberStatus(Request $request)
    {
        $request->validate([
            'status' => [
                'required',
            ],
        ]);
        
        $user = User::find($request->id); 
        $user->update([
            'status' => $request->status ? '0' : '1',
            
        ]);
        return redirect()->back();
    }
}
