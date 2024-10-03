<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    public function tableListing()
    {

        return Inertia::render('Table/TableListing');
    }
}
