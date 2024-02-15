<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::post('/location/add',[LocationController::class, 'create']);
Route::post('/location/update/{id}',[LocationController::class, 'update']);
Route::get('/location',[LocationController::class, 'getAll']);
Route::get('/location/{id}',[LocationController::class, 'getById']);
Route::get('/location/delete/{id}',[LocationController::class, 'delete']);
