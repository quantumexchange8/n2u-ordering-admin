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
        $item = Item::get();

        return response()->json($item);
    }
}
