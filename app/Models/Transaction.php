<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {
    protected $fillable = [
        'tra_type', 'tra_value', 'tra_description', 'tra_created_at',
    ];

    public $timestamps = false;

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'acc_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'cat_id');
    }

    public static function saveTransaction($data)
    {
        return self::create([
            'tra_type' => $data['tra_type'],
            'tra_value' => $data['tra_value'],
            'tra_description' => $data['tra_description'],
            'tra_created_at' => $data['tra_created_at'],
        ]);
    }
}
