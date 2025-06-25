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
    public function index(Request $request)
    {
        $userId = Auth::id();

        $categories = Category::where('user_id', $userId)->get();
        $accounts = Account::where('user_id', $userId)->get();
        $accountFilter = $request->query('account');
        $categoryFilter = $request->query('category');

        $transactions = Transaction::with('category')
            ->whereHas('account', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->when($accountFilter, function ($query, $account) {
                $query->where('account_id', $account);
            })
            ->when($categoryFilter, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->paginate(10);

        return Inertia::render('transaction', [
            'items' => $transactions,
            'categories' => $categories,
            'accounts' => $accounts,
        ]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();

        $validated = $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'type' => 'required|in:income,expense',
            'value' => 'required|numeric',
            'description' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $transaction = Transaction::create([
            'account_id' => $validated['account_id'],
            'category_id' => $validated['category_id'],
            'type' => $validated['type'],
            'value' => (float) str_replace(',', '.', $validated['value']),
            'description' => $validated['description'],
        ]);

        $account = Account::find($validated['account_id']);

        $account->updateBalance($transaction);

        return redirect()->back()->with('success', 'Transaction created successfully!');
    }
}
