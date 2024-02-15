<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::post('/user/add',[LocationController::class, 'create']);
Route::post('/user/update/{id}',[LocationController::class, 'update']);
Route::get('/user',[LocationController::class, 'getAll']);
Route::get('/user/{id}',[LocationController::class, 'getById']);
Route::get('/user/delete/{id}',[LocationController::class, 'delete']);
