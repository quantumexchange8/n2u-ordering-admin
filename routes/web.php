<?php

use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
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

        Route::post('/updateMemberWallet', [MemberController::class, 'updateMemberWallet'])->name('member.updateMemberWallet');
        Route::post('/updateMemberProfile', [MemberController::class, 'updateMemberProfile'])->name('member.updateMemberProfile');
        
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
     *           Configuration
     * ==============================
     */
    Route::get('/configuration', [ConfigurationController::class, 'configuration'])->name('configuration');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/components/buttons', function () {
    return Inertia::render('Components/Buttons');
})->middleware(['auth', 'verified'])->name('components.buttons');

require __DIR__.'/auth.php';
