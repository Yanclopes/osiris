<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    protected $fillable = [
        'cat_name', 'cat_type', 'cat_created_at',
    ];

    public $timestamps = false;

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'category_id', 'cat_id');
    }

    public static function saveCategory($data)
    {
        return self::create([
            'cat_name' => $data['cat_name'],
            'cat_type' => $data['cat_type'],
            'cat_created_at' => $data['cat_created_at'],
        ]);
    }
}
