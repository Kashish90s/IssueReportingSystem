<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('/comment/add',[CommentController::class, 'create']);
Route::post('/comment/update/{id}',[CommentController::class, 'update']);
Route::get('/comment',[CommentController::class, 'getAll']);
Route::get('/comment/{id}',[CommentController::class, 'getById']);
Route::get('/comment/delete/{id}',[CommentController::class, 'delete']);
Route::get('/comment/commentUser/{id}',[CommentController::class,'getCommentUsers']);
Route::get('/comment/commentReport/{id}',[CommentController::class,'getCommentReport']);
