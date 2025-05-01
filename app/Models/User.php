<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    protected $fillable = [
        'usu_name', 'usu_email', 'usu_password', 'usu_created_at',
    ];

    public $timestamps = false;

    public function accounts()
    {
        return $this->hasMany(Account::class, 'user_id', 'usu_id');
    }

    public static function saveUser($data)
    {
        return self::create([
            'usu_name' => $data['usu_name'],
            'usu_email' => $data['usu_email'],
            'usu_password' => bcrypt($data['usu_password']),
            'usu_created_at' => $data['usu_created_at'],
        ]);
    }
}
