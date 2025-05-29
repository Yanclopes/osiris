<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $accounts = Account::where('user_id', $userId)
            ->paginate(10);

        return Inertia::render('account', [
            'items' => $accounts,
            'accountTypes' => Account::getTypeList()
        ]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:1,2',
            'balance' => 'required|numeric',
        ]);
        
        Account::create([
            'user_id' => $userId,
            'name' => $validated['name'],
            'type' => $validated['type'],
            'balance' => $validated['balance'],
        ]);

        return redirect()->back()->with('success', 'Account created successfully!');
    }
}
