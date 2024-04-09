<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::post('/report/add',[ReportController::class, 'create']);
Route::post('/report/update/{id}',[ReportController::class, 'update']);
Route::get('/report',[ReportController::class, 'getAll']);
Route::get('/report/completed',[ReportController::class, 'getCompleted']);
Route::get('/report/{id}',[ReportController::class, 'getById']);
Route::get('/report/delete/{id}',[ReportController::class, 'delete']);
Route::patch('/report/toggleIssueStatus/{id}',[ReportController::class, 'toggleIssueStatus']);
Route::get('/report/reportUser/{id}',[ReportController::class,'getReportUsers']);
Route::get('/report/reportComment/{id}',[ReportController::class,'getComments']);
Route::get('/report/reportLocation/{id}',[ReportController::class,'getLocation']);
Route::get('/report/reportIssueType/{id}',[ReportController::class,'getIssueType']);
Route::get('/report/reportImage/{id}',[ReportController::class,'getImage']);
Route::get('/report/reportNotification/{id}',[ReportController::class,'getNotification']);
