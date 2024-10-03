<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FetchDataController extends Controller
{
    public function fetchCustomer()
    {
        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            
        ]);

        if ($response->successful()) {

        }



        return response()->json(['message' => $response], 500);

    }
}
