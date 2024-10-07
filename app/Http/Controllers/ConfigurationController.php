<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\Tax;

class ConfigurationController extends Controller
{
    public function configuration()
    {
        $settings = Setting::get();
        $taxes = Tax::get();

        return Inertia::render('Configuration/Configuration', [
            'settings' => $settings,
            'taxes' => $taxes,
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
            'type' => $request->type,
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
            'type' => $request->type,
        ]);

        return redirect()->back();
    }

    public function deleteSetting(Request $request)
    {

        $setting = Setting::find($request->id);
        $setting->delete();

        return redirect()->back();
    }

    public function newTax(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:1',
            ],
            'tax_after' => [
                'required',
                'numeric',
                'min:1',
            ],
            'tax_type' => [
                'required',
                'string',
                'max:255',
            ],            
        ]);

        $tax = Tax::create([
            'name' => $request->name,
            'amount' => $request->amount,
            'tax_after' => $request->tax_after,
            'tax_type' => $request->tax_type,
        ]);

        return redirect()->back();
    }

    public function updateTax(Request $request)
    {

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:1',
            ],
            'tax_after' => [
                'required',
                'numeric',
                'min:1',
            ],
            'tax_type' => [
                'required',
                'string',
                'max:255',
            ],  
        ]);

        $tax = Tax::find($request->id);

        $tax->update([
            'name' => $request->name,
            'amount' => $request->amount,
            'tax_after' => $request->tax_after,
            'tax_type' => $request->tax_type,
        ]);

        return redirect()->back();
    }

    public function deleteTax(Request $request)
    {
        
        $tax = Tax::find($request->id);
        $tax->delete();

        return redirect()->back();
    }
}
