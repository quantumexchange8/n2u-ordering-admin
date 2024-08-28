<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function configuration()
    {

        $settings = Setting::get();

        return Inertia::render('Configuration/Configuration', [
            'settings' => $settings,
        ]);
    }

    public function newConfiguration(Request $request)
    {

        $request->validate([
            'setting_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('settings'),
            ],
            'value' => [
                'required',
                'max:255',
                'numeric',
                'min:1',
            ],
        ]);

        $setting = Setting::create([
            'setting_name' => $request->setting_name,
            'value' => $request->value,
        ]);

        return redirect()->back();
    }

    public function updateConfiguration(Request $request)
    {

        $request->validate([
            'setting_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('settings')->ignore($request->id),
            ],
            'value' => [
                'required',
                'max:255',
                'numeric',
                'min:1',
            ],
        ]);

        $setting = Setting::find($request->id);

        $setting->update([
            'setting_name' => $request->setting_name,
            'value' => $request->value,
        ]);

        return redirect()->back();
    }

    public function deleteSetting(Request $request)
    {

        $setting = Setting::find($request->id);
        $setting->delete();

        return redirect()->back();
    }
}
