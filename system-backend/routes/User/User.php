<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/user/add',[UserController::class, 'create']);
Route::post('/user/update/{id}',[UserController::class, 'update']);
Route::get('/user',[UserController::class, 'getAll']);
Route::get('/user/{id}',[UserController::class, 'getById']);
Route::get('/user/delete/{id}',[UserController::class, 'delete']);
Route::post('/user/toggleStatus/{id}',[UserController::class,'toggleStatus']);
Route::post('/user/toggleFlagged/{id}',[UserController::class,'toggleFlagged']);
Route::get('/user/userReport/{id}',[UserController::class,'getReports']);
Route::get('/user/userComment/{id}',[UserController::class,'getComments']);
Route::get('/user/userNotification/{id}',[UserController::class,'getNotifications']);
Route::get('/user/userImage/{id}',[UserController::class,'getImages']);


