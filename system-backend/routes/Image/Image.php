<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::post('/user/add',[ImageController::class, 'create']);
Route::post('/user/update/{id}',[ImageController::class, 'update']);
Route::get('/user',[ImageController::class, 'getAll']);
Route::get('/user/{id}',[ImageController::class, 'getById']);
Route::get('/user/delete/{id}',[ImageController::class, 'delete']);
