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

        $transaction = TransactionHistory::with(['user:id,customer_id,name'])
                ->orderBy('receipt_start', 'desc')
                ->get();

        return response()->json($transaction);
    }
}
