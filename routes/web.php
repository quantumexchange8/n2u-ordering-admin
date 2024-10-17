<?php

use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FetchDataController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VoucherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});


Route::middleware('auth')->group(function () {

    /**
     * ==============================
     *           Dashboard
     * ==============================
     */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /**
     * ==============================
     *           Member Listing
     * ==============================
     */
    Route::prefix('member')->group(function () {
        Route::get('/member-listing', [MemberController::class, 'memberListing'])->name('member.member-listing');
        Route::get('/member-details/{id}', [MemberController::class, 'memberDetails'])->name('member.memberDetails');
        Route::get('/getMemberDetails', [MemberController::class, 'getMemberDetails'])->name('member.getMemberDetails');
        Route::get('/getMemberJoined', [MemberController::class, 'getMemberJoined'])->name('member.getMemberJoined');
        Route::get('/getUserDetails', [MemberController::class, 'getUserDetails'])->name('member.getUserDetails');
        Route::get('/getUserTransaction', [MemberController::class, 'getUserTransaction'])->name('member.getUserTransaction');
        Route::get('/getUserWallet', [MemberController::class, 'getUserWallet'])->name('member.getUserWallet');

        Route::post('/updateMemberWallet', [MemberController::class, 'updateMemberWallet'])->name('member.updateMemberWallet');
        Route::post('/updateMemberProfile', [MemberController::class, 'updateMemberProfile'])->name('member.updateMemberProfile');
        Route::post('/deleteMember', [MemberController::class, 'deleteMember'])->name('member.deleteMember');
        Route::post('/updateMemberPassword', [MemberController::class, 'updateMemberPassword'])->name('member.updateMemberPassword');
     });

     /**
     * ==============================
     *           Transaction
     * ==============================
     */

     Route::prefix('transaction')->group(function () {
        Route::get('/pending', [TransactionController::class, 'deposit'])->name('transaction.pending');
        Route::get('/getPendingDeposit', [TransactionController::class, 'getPendingDeposit'])->name('getPendingDeposit');
        Route::get('/getDepositHistory', [TransactionController::class, 'getDepositHistory'])->name('getDepositHistory');
        Route::get('/getWithdrawalHistory', [TransactionController::class, 'getWithdrawalHistory'])->name('getWithdrawalHistory');
        Route::post('/approveTransaction', [TransactionController::class, 'approveTransaction'])->name('approveTransaction');
        Route::post('/rejectTransaction', [TransactionController::class, 'rejectTransaction'])->name('rejectTransaction');

        Route::get('/getPendingRank', [TransactionController::class, 'getPendingRank'])->name('getPendingRank');
        Route::post('/approvePendingRank', [TransactionController::class, 'approvePendingRank'])->name('approvePendingRank');
        Route::post('/rejectPendingRank', [TransactionController::class, 'rejectPendingRank'])->name('rejectPendingRank');

        // histroy
        Route::get('/history', [TransactionController::class, 'history'])->name('transaction.history');
     });

     /**
     * ==============================
     *           Table Listing
     * ==============================
     */
    Route::prefix('table')->group(function () {
        Route::get('/table-listing', [TableController::class, 'tableListing'])->name('table.table-listing');
    });

     /**
     * ==============================
     *           Voucher Listing
     * ==============================
     */

     Route::prefix('voucher')->group(function () {
        Route::get('/voucher-listing', [VoucherController::class, 'voucherListing'])->name('voucher.voucher-listing');
        Route::post('/addVoucher', [VoucherController::class, 'addVoucher'])->name('voucher.addVoucher');
        Route::post('/deleteVoucher', [VoucherController::class, 'deleteVoucher'])->name('voucher.deleteVoucher');
        Route::post('/updateVoucher', [VoucherController::class, 'updateVoucher'])->name('voucher.updateVoucher');
        
        Route::get('/getAllVoucher', [VoucherController::class, 'getAllVoucher'])->name('getAllVoucher');
     });

     /**
     * ==============================
     *           Configuration
     * ==============================
     */
    Route::get('/configuration', [ConfigurationController::class, 'configuration'])->name('configuration');
    Route::post('/newConfiguration', [ConfigurationController::class, 'newConfiguration'])->name('newConfiguration');
    Route::post('/updateConfiguration', [ConfigurationController::class, 'updateConfiguration'])->name('updateConfiguration');
    Route::post('/deleteSetting', [ConfigurationController::class, 'deleteSetting'])->name('deleteSetting');
    Route::post('/newTax', [ConfigurationController::class, 'newTax'])->name('newTax');
    Route::post('/updateTax', [ConfigurationController::class, 'updateTax'])->name('updateTax');
    Route::post('/deleteTax', [ConfigurationController::class, 'deleteTax'])->name('deleteTax');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * ==============================
     *           Fetch Latest Data
     * ==============================
     */
    Route::post('/fetch-customer', [FetchDataController::class, 'fetchCustomer'])->name('fetch-customer');
    Route::post('/syncUserDetails', [FetchDataController::class, 'syncUserDetails'])->name('syncUserDetails');

});

Route::get('/components/buttons', function () {
    return Inertia::render('Components/Buttons');
})->middleware(['auth', 'verified'])->name('components.buttons');

require __DIR__.'/auth.php';
