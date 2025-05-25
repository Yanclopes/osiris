<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $userId = Auth::id();

        $account = Account::find(1);
        $category = Category::find(1);

        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'value' => 'required|string',
            'description' => 'required|string|max:255',
        ]);

        $numericValue = str_replace(',', '.', $validated['value']);

        // Criação da transação via Eloquent
        Transaction::create([
            'account_id' => $account->id,
            'category_id' => $category->id,
            'type' => $validated['type'],
            'value' => (float) $numericValue,
            'description' => $validated['description'],
        ]);

        return redirect()->back()->with('success', 'Transaction created successfully!');
    }
}
