<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'reports';
    protected $fillable = [
        'title',
        'description',
        'reported_date',
        'user_id',
        'location_id',
        'issue_status',
        'issue_type',
        'image_id',
        'votes'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
