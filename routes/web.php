<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (!Auth::check()) {
        return redirect()->route('login');
    }
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('transaction', [\App\Http\Controllers\TransactionController::class, 'index'])->name('transaction');
    Route::post('transaction', [\App\Http\Controllers\TransactionController::class, 'store'])->name('transaction.store');
    Route::put('transaction/{id}', [\App\Http\Controllers\TransactionController::class, 'update'])->name('transaction.update');

    Route::get('category', [\App\Http\Controllers\CategoryController::class, 'index'])->name('category');
    Route::post('category', [\App\Http\Controllers\CategoryController::class, 'store'])->name('category.store');

    Route::get('account', [\App\Http\Controllers\AccountController::class, 'index'])->name('account');
    Route::post('account', [\App\Http\Controllers\AccountController::class, 'store'])->name('account.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
