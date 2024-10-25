<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orderHistory()
    {   
        return Inertia::render('Order/OrderHistory');
    }
}
