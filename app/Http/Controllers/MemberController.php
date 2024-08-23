<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
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
}
