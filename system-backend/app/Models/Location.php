<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'locations';
    protected $fillable = [
        'street_name',
        'ward',
        'zip_code'
    ];

    public function report(){
        return $this->hasOne(Report::class);
    }
}
