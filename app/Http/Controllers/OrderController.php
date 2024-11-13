<?php

namespace App\Http\Controllers;

use App\Models\TransactionHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orderHistory()
    {   
        return Inertia::render('Order/OrderHistory');
    }

    public function getOrderTransaction()
    {

        $transaction = TransactionHistory::get();

        return response()->json($transaction);
    }
}
