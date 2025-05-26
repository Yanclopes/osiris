<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $categories = Category::where('user_id', $userId)
            ->paginate(10);

        return Inertia::render('category', [
            'items' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        Category::create([
            'user_id' => $userId,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Category created successfully!');
    }
}