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
    public function location(){
        return $this->belongsTo(Location::class,'location_id');
    }
    public function issueType(){
        return $this->belongsTo(IssueType::class,'issue_type');
    }
    public function image(){
        return $this->belongsTo(Image::class);
    }
    public function notification(){
        return $this->hasMany(Notification::class);
    }

}
