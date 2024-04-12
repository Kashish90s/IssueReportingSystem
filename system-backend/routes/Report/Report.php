<?php

use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;


Route::controller(ReportController::class)->group(function () {
    Route::post('/report/add', 'create');
    Route::post('/report/update/{id}','update');
    Route::get('/report','getAll');
    Route::get('/report/completed','getCompleted');
    Route::get('/report/popular','getMostPopular');
    Route::get('/report/{id}','getById');
    Route::get('/report/delete/{id}','delete');
    Route::patch('/report/vote/{report_id}/{user_id}','postLike');
    Route::patch('/report/toggleIssueStatus/{id}','toggleIssueStatus');
    Route::get('/report/reportUser/{id}','getReportUsers');
    Route::get('/report/reportComment/{id}','getComments');
    Route::get('/report/reportLocation/{id}','getLocation');
    Route::get('/report/reportIssueType/{id}','getIssueType');
    Route::get('/report/reportImage/{id}','getImage');
    Route::get('/report/reportNotification/{id}','getNotification');
});