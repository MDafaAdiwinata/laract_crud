<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'id_product';
    protected $table = 'products';

    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
    ];
}
