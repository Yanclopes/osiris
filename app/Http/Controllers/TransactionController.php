<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $transactions = Transaction::whereHas('account', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->paginate(10);

        return Inertia::render('transaction', [
            'items' => $transactions,
        ]);
    }
}
