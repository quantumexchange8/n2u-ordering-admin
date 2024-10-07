<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchDataController extends Controller
{
    // protected $apiKey;

    public function fetchCustomer(Request $request)
    {
        // $this->apiKey = env('POS_token');
        $api = '6d6331e163cda5af33ed0829a35f1d6b94579735';
        $resource_type = 'Customer';
        $outlet = 'outlet1';

        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $api,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            Log::debug('response', $data);

            foreach ($data['result']['user_data'] as $customer) {

                $POS_phone = $customer['Phone'];
                $normalizedPOSPhone = $this->normalizePhoneNumber($POS_phone);
                
                $user = User::whereRaw('RIGHT(phone_number, 9) = ?', [$normalizedPOSPhone])->orWhere('email', $customer['Email'])->first();

                if ($user) {
                    $user->update([
                        'sync' => 'yes',
                        'customer_id' => $customer['idCustomer'],
                        'existing_phone_pos' => $POS_phone,
                        'dob' => $customer['Birthday'],
                        'gender' => $customer['Gender'],
                        'point' => $customer['RewardPoints'],
                        'member_id' => $customer['CustomerCardID'],
                    ]);
                }
            }
        } else {
            return redirect()->back()->with('error', 'Failed to fetch data');
        }
        
    }

    public function syncUserDetails(Request $request)
    {
        $api = '6d6331e163cda5af33ed0829a35f1d6b94579735';
        $resource_type = 'Customer';
        $outlet = 'outlet1';

        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $api,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            $customers = collect($data['result']['user_data']);

            $filteredCustomer = $customers->where('idCustomer', $request->idCustomer)->first();
            $user = User::find($request->id);
            Log::debug('customer details', $filteredCustomer);

            if ($filteredCustomer) {
                $user->update([
                    'customer_id' => $filteredCustomer['idCustomer'],
                    'existing_phone_pos' => $filteredCustomer['Phone'],
                    'dob' => $filteredCustomer['Birthday'],
                    'gender' => $filteredCustomer['Gender'],
                    'point' => $filteredCustomer['RewardPoints'],
                    'status' => $filteredCustomer['Voided'],
                ]);
            } else {
                // Handle case where customer is not found
                Log::info('No customer found with idCustomer: ' . $request->idCustomer);
            }

        } else {
            return redirect()->back()->with('error', 'Failed to fetch data');
        }
    }

    private function normalizePhoneNumber($phone)
    {
        // Remove any non-numeric characters like +, spaces, etc.
        $numericPhone = preg_replace('/[^0-9]/', '', $phone);

        // Return only the last 9 digits
        return substr($numericPhone, -9);
    }
}
