<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'notifications';
    protected $fillable = [
        'title',
        'description',
        'notification_date',
        'user_id',
        'report_id',
        'image_id'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function report(){
        return $this->belongsTo(Report::class,'report_id');
    }
}
