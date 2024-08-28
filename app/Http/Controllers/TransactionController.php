<?php

namespace App\Http\Controllers;

use App\Models\CommissionLog;
use App\Models\Ranking;
use App\Models\RankSubscription;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function deposit()
    {

        return Inertia::render('Transaction/Transaction');
    }

    public function getPendingDeposit()
    {

        $pending = Transaction::query()
                ->where('status', 'pending')
                ->with(['user:id,name'])
                ->latest()
                ->get();
        
        return response()->json($pending);
    }

    public function getDepositHistory()
    {

        $history = Transaction::query()
                ->where('transaction_type', 'Deposit')
                ->whereNot('status', 'pending')
                ->with(['user:id,name'])
                ->latest()
                ->get();
        
        return response()->json($history);
    }

    public function getWithdrawalHistory()
    {

        $history = Transaction::query()
                ->where('transaction_type', 'Withdrawal')
                ->whereNot('status', 'pending')
                ->with(['user:id,name'])
                ->latest()
                ->get();

        return response()->json($history);
    }

    public function approveTransaction(Request $request)
    {
        $transaction = Transaction::find($request->id);

        $transaction->update([
            'status' => 'success',
            'transaction_date' => now(),
            'handle_by' => Auth::user()->id,
        ]);

        $wallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $transaction->user_id)->first();

        $wallet->balance += $transaction->amount;
        $wallet->save();

        return redirect()->back()->with('success');
    }

    public function rejectTransaction(Request $request)
    {
        
        $transaction = Transaction::find($request->id);

        $transaction->update([
            'status' => 'rejected',
            'transaction_date' => now(),
            'handle_by' => Auth::user()->id,
            'remark' => $request->remark,
        ]);

        return redirect()->back()->with('success');
    }


    // Rank
    public function getPendingRank()
    {

        $rank = RankSubscription::query()
                ->where('status', 'pending')
                ->with(['rank', 'user:id,name'])
                ->get();

        return response()->json($rank);
    }

    public function approvePendingRank(Request $request)
    {

        $upgradeRank = RankSubscription::find($request->id);
        $expired_at = Carbon::now()->addYear();
        $user = User::where('id', $upgradeRank->user_id)->first();

        $userWallet = Wallet::where('user_id', $upgradeRank->user_id)
                ->where('type', 'cash_wallet')
                ->first();

        $referralComm = Setting::where('setting_name', 'referral commission')->first();

        $upgradeRank->update([
            'status' => 'success',
            'expired_date' => $expired_at,
        ]);

        $user->rank_id = $upgradeRank->new_rank;
        $user->save();

        $commLog = CommissionLog::create([
            'user_id' => $user->id,
            'wallet_id' => $userWallet->id,
            'amount' => $referralComm->value,
            'old_balance' => $userWallet->balance,
            'new_balance' => $userWallet->balance += $referralComm->value,
            'transaction_date' => now(),
        ]);

        $userWallet->balance += $referralComm->value;
        $userWallet->save();

        return redirect()->back()->with('success');
    }

    public function rejectPendingRank(Request $request)
    {
        $upgradeRank = RankSubscription::find($request->id);
        $rankFee = Ranking::where('name', 'VIP')->first();

        $upgradeRank->update([
            'status' => 'rejected',
            'remark' => $request->remark,
            'handle_by' => Auth::user()->id,
        ]);

        $userWallet = Wallet::where('user_id', $upgradeRank->user_id)
                ->where('type', 'cash_wallet')
                ->first();

        $userWallet->balance += $rankFee->min_amount;
        $userWallet->save();

        return redirect()->back()->with('success');
    }


    // History
    public function history()
    {

        return Inertia::render('Transaction/History');
    }
}
