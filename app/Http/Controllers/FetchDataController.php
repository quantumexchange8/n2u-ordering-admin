<?php

namespace App\Http\Controllers;

use App\Models\TransactionHistory;
use App\Models\User;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Category;

class FetchDataController extends Controller
{
    protected $apiKey;

    public function fetchCustomer(Request $request)
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
                        'address1' => $customer['Address1'],
                        'address2' => $customer['Address2'],
                        'address3' => $customer['Address3'],
                        'city' => $customer['City'],
                        'state' => $customer['State'],
                        'zip' => $customer['Zip'],
                        'voided' => $customer['Voided'],
                        'joined_date' => $customer['MemberSince'],
                        'expired_date' => $customer['MemberExpiry'],
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
            Log::debug('customer details', ['filteredCustomer' => $filteredCustomer]);

            if ($filteredCustomer) {
                $user->update([
                    'customer_id' => $filteredCustomer['idCustomer'],
                    'existing_phone_pos' => $filteredCustomer['Phone'],
                    'dob' => $filteredCustomer['Birthday'],
                    'gender' => $filteredCustomer['Gender'],
                    'point' => $filteredCustomer['RewardPoints'],
                    'voided' => $filteredCustomer['Voided'],
                    'address1' => $filteredCustomer['Address1'],
                    'address2' => $filteredCustomer['Address2'],
                    'address3' => $filteredCustomer['Address3'],
                    'city' => $filteredCustomer['City'],
                    'state' => $filteredCustomer['State'],
                    'zip' => $filteredCustomer['Zip'],
                    'voided' => $filteredCustomer['Voided'],
                    'joined_date' => $filteredCustomer['MemberSince'],
                    'expired_date' => $filteredCustomer['MemberExpiry'],
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

    public function fetchTransaction(Request $request)
    {
        
        $request->validate([
            'start_date' => ['required'],
            'end_date' => ['required'], // 'confirmed' ensures password and confirmPassword match
        ]);

        $this->apiKey = env('POS_token');
        $resource_type = 'Transaction';
        $outlet = 'outlet1';
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        
        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $this->apiKey,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
            'start_date' => $start_date,
            'end_date' => $end_date,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            Log::debug('response', $data);

            foreach ($data['result']['user_data'] as $transaction) {
            
                $transId = TransactionHistory::where('transaction_id', $transaction['idTransaction'])->first();

                if ($transId) {
                    // If the transaction ID already exists, skip to the next iteration
                    continue;
                }

                // Process $transaction only if the transaction ID does not exist
                TransactionHistory::create([
                    'transaction_id' => $transaction['idTransaction'],
                    // 'user_id' => $transaction->CustomerID,
                    'receipt_no' => $transaction['ReceiptNo'],
                    'receipt_start' => $transaction['ReceiptDateStart'],
                    'receipt_end' => $transaction['ReceiptDateEnd'],
                    'receipt_total' => $transaction['ReceiptTotalAmount'] === "" ? null : $transaction['ReceiptTotalAmount'],
                    'receipt_grand_total' => $transaction['ReceiptGrandTotal'] === "" ? null : $transaction['ReceiptGrandTotal'],
                    'rounding' => $transaction['Rounding'] === "" ?  null :  $transaction['Rounding'],
                    'discount_type' => $transaction['DiscountType'],
                    'discount_amount' => $transaction['DiscountAmt'],
                    'discount_receipt_amount' => $transaction['DiscountOnReceiptAmt'],
                    'discount_id' => $transaction['DiscountID'],
                    'discount_item' => $transaction['DiscountOnItemAmt'] === "" ? null : $transaction['DiscountOnItemAmt'],
                    'tip_type' => $transaction['TipsType'],
                    'tip_amount' => $transaction['TipsAmt'],
                    'tip_receipt_amount' => $transaction['TipsOnReceiptAmt'],
                    'change' => $transaction['Change'] === "" ? null : $transaction['Change'],
                    'table_id' => $transaction['TableID'],
                    'pax_no' => $transaction['NoOfPax'],
                    'trans_by' => $transaction['TransBy'],
                    'cust_name' => $transaction['CustName'] === "" ? null : $transaction['CustName'],
                    'phone_no' => $transaction['PhoneNo'] === "" ? null : $transaction['PhoneNo'],
                    'cust_id' => $transaction['CustomerID'] === "" ? null : $transaction['CustomerID'],
                    'reward_point' => $transaction['RewardPoints'] === "" ? 0.00 : $transaction['RewardPoints'],
                    'remark' => $transaction['Remarks'] === "" ? null : $transaction['Remarks'],
                    'voided' => $transaction['Voided'],
                ]);
            }

            return redirect()->back();

        } else {
            return redirect()->back()->withErrors('error', 'Failed to fetch data');
        }

    }

    public function fetchCategory(Request $request){
        $this->apiKey = env('POS_token');
        $resource_type = 'Category';
        $outlet = 'outlet1';

        $response = Http::post('https://cloud.geniuspos.com.my/api_access/api_resource', [
            'api_token' => $this->apiKey,
            'resource_type' => $resource_type,
            'outlet' => $outlet,
        ]);
        
        if ($response->successful()) {
            $data = $response->json();

            Log::debug('response', $data);

            foreach ($data['result']['user_data'] as $category) {
            
                $catId = Category::where('category_id', $category['idCategory'])->first();

                if ($catId) {
                    continue;
                }

                Category::create([
                    'category_id' => $category['idCategory'],
                    'name' => $category['Name'],
                    'image' => $category['Image'] === "" ? null : $category['Image'],
                    'assigned_printer' => $category['AssignedPrinter'],
                    'sequence' => $category['Sequence'],
                    'status' => $category['Voided'],
                    'availability' => $category['Availability'],
                    'auto_discount' => $category['AutomatedDiscount'],
                    'accessible' => $category['Accessible'] === "" ? null : $category['Accessible'],
                    'course_setting_id' => $category['CourseSettingID'],
                    'contain_mod_group_id' => $category['ContainModGroupID'] === "" ? null : $category['ContainModGroupID'],
                    'reporting_category_id' => $category['ReportingCategoryID'],
                    'description' => $category['Description'] === "" ? null : $category['Description']
                ]);
            }

            return redirect()->back();

        } else {
            return redirect()->back()->withErrors('error', 'Failed to fetch data');
        }
    }
}
