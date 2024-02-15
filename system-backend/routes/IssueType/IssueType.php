<?php

use App\Http\Controllers\IssueTypeController;
use Illuminate\Support\Facades\Route;

Route::post('/issueType/add',[IssueTypeController::class, 'create']);
Route::post('/issueType/update/{id}',[IssueTypeController::class, 'update']);
Route::get('/issueType',[IssueTypeController::class, 'getAll']);
Route::get('/issueType/{id}',[IssueTypeController::class, 'getById']);
Route::get('/issueType/delete/{id}',[IssueTypeController::class, 'delete']);
