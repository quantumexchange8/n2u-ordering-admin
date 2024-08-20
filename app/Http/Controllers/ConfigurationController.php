<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function configuration()
    {

        return Inertia::render('Configuration/Configuration');
    }
}
