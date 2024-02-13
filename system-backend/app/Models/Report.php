<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

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
}
