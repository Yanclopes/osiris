<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    protected $fillable = [
        'acc_name', 'acc_type', 'acc_balance', 'acc_created_at',
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'usu_id');
    }

    public static function saveAccount($data)
    {
        return self::create([
            'acc_name' => $data['acc_name'],
            'acc_type' => $data['acc_type'],
            'acc_balance' => $data['acc_balance'],
            'acc_created_at' => $data['acc_created_at'],
        ]);
    }
}
