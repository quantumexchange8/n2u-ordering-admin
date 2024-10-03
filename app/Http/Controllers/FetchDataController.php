<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchDataController extends Controller
{
    public function fetchCustomer()
    {
        $api_token = 'abc';
        $resource_type = 'Customer';
        $outlet = 'outlet1';

        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $api_token,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            Log::debug('response', $data);
        }

        return response()->json(['message' => 'Failed to fetch data'], 500);
    }
}
