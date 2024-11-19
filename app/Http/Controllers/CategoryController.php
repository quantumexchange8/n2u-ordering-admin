<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function category()
    {

        return Inertia::render('Category/Category');
    }

    public function getCategory()
    {
        $category = Category::where('status', !1)->get();

        return response()->json($category);
    }
}
