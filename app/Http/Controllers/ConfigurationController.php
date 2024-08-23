<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function configuration()
    {

        $rank = Setting::where('setting_name', 'rank')->get();

        return Inertia::render('Configuration/Configuration', [
            'rank' => $rank,
        ]);
    }
}
