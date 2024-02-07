<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


///User Route

Route::post('/user/add',[UserController::class, 'create']);
Route::post('/user/update/{id}',[UserController::class, 'update']);
Route::get('/user',[UserController::class, 'getAll']);
Route::get('/user/{id}',[UserController::class, 'getById']);
Route::get('/user/delete/{id}',[UserController::class, 'delete']);



////
