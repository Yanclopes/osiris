<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    const TYPE_CURRENT_ACCOUNT = 1;
    const TYPE_SAVING_ACCOUNT = 2;

    protected $fillable = [
        'name', 'type', 'balance', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    static function getTypeList()
    {
        return [
            self::TYPE_CURRENT_ACCOUNT => 'Current account',
            self::TYPE_SAVING_ACCOUNT => 'Saving account',
        ];
    }
}
