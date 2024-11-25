<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function item()
    {
        return Inertia::render('Item/Item');
    }

    public function getItem()
    {
        $item = Item::where('status', !1)->get();

        return response()->json($item);
    }
}
