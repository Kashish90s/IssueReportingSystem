<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/notification/add',[NotificationController::class, 'create']);
Route::post('/notification/update/{id}',[NotificationController::class, 'update']);
Route::get('/notification',[NotificationController::class, 'getAll']);
Route::get('/notification/{id}',[NotificationController::class, 'getById']);
Route::get('/notification/delete/{id}',[NotificationController::class, 'delete']);