<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::post('/report/add',[ReportController::class, 'create']);
Route::post('/report/update/{id}',[ReportController::class, 'update']);
Route::get('/report',[ReportController::class, 'getAll']);
Route::get('/report/{id}',[ReportController::class, 'getById']);
Route::get('/report/delete/{id}',[ReportController::class, 'delete']);
Route::get('/report/toggleIssueStatus/{id}',[ReportController::class, 'delete']);
Route::get('/user/reportUser/{id}',[ReportController::class,'getReportUsers']);
Route::get('/user/reportComment/{id}',[ReportController::class,'getComments']);
Route::get('/user/reportLocation/{id}',[ReportController::class,'getLocation']);
Route::get('/user/reportIssueType/{id}',[ReportController::class,'getIssueType']);
