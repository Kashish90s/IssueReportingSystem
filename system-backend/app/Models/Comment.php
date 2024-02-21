<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comments';
    protected $fillable = [
        'description',
        'commented_date',
        'user_id',
        'report_id',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function report(){
        return $this->belongsTo(Report::class,'report_id');
    }
}
