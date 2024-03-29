<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueType extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'issue_types';
    protected $fillable = [
        'title',
        'description'
    ];

    public function report(){
        return $this->hasOne(Report::class,'issue_type');
    }
}
