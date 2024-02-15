<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::post('/image/add',[ImageController::class, 'create']);
Route::post('/image/update/{id}',[ImageController::class, 'update']);
Route::get('/image',[ImageController::class, 'getAll']);
Route::get('/image/{id}',[ImageController::class, 'getById']);
Route::get('/image/delete/{id}',[ImageController::class, 'delete']);
