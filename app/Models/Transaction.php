<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {

    CONST INCOME = 'income';
    CONST Expense = 'expense';

    protected $fillable = [
        'type', 'value', 'description', 'account_id', 'category_id'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
