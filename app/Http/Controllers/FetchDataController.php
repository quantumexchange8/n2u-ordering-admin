<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchDataController extends Controller
{
    protected $apiKey;

    public function fetchCustomer()
    {
        $this->apiKey = env('POS_token');
        $resource_type = 'Customer';
        $outlet = 'outlet1';

        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $this->apiKey,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            Log::debug('response', $data);

            foreach ($data['result']['user_data'] as $customer) {

                $POS_phone = $customer['Phone'];
                $normalizedPOSPhone = $this->normalizePhoneNumber($POS_phone);

                Log::debug('formatted', ['normalizedPOSPhone' => $normalizedPOSPhone]);
                
                $user = User::whereRaw('RIGHT(phone_number, 9) = ?', [$normalizedPOSPhone])->orWhere('email', $customer['Email'])->first();

                Log::debug('user', $user);

                if ($user) {
                    // $user->update([
                    //     'sync' => 'yes',
                    //     'customer_id' => $customer['idCustomer'],
                    //     'existing_phone_pos' => $POS_phone,
                    //     'dob' => $customer['Birthday'],
                    //     'gender' => $customer['Gender'],
                    //     'point' => $customer['RewardPoints'],
                    //     'member_id' => $customer['CustomerCardID'],
                    // ]);
                }

                // $user = User::create([
                //     'name' => $customer['FirstName'],
                //     'last_name' => $customer['LastName'],
                //     'email' => $customer['Email'],
                //     'role' => 'member',
                //     'role_id' => RunningNumberService::getID('member'),
                //     'member_id' => $customer['CustomerCardID'],
                //     'dial_code' => $customer['FirstName'],
                //     'phone' => $customer['Phone'],
                //     'dob' => $customer['Birthday'],
                //     'gender' => $customer['Gender'],
                //     'point' => $customer['RewardPoints'],
                //     'rank_id' => $customer['FirstName'],
                //     'address1' => $customer['Address1'],
                //     'address2' => $customer['Address2'],
                //     'address3' => $customer['Address3'],
                //     'city' => $customer['City'],
                //     'state' => $customer['State'],
                //     'zip' => $customer['Zip'],
                //     'status' => $customer['FirstName'],
                //     'branch' => $customer['FirstName'],
                //     'remark' => $customer['FirstName'],
                //     'created_at' => $customer['MemberSince'],
                // ]);
            }
        }

        return response()->json(['message' => 'Failed to fetch data'], 500);
    }

    private function normalizePhoneNumber($phone)
    {
        // Remove any non-numeric characters like +, spaces, etc.
        $numericPhone = preg_replace('/[^0-9]/', '', $phone);

        // Return only the last 9 digits
        return substr($numericPhone, -9);
    }
}
