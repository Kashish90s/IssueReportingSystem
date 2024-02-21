<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\Comment\CommentRequest;
use App\Models\Comment;
use Exception;

class CommentController extends Controller
{
    public function getAll(){
        try{
            $comment = Comment::all();
            return response()->json([ApiStatus::Success,'All data fetched','comment'=>$comment], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $comment = Comment::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','comment'=>$comment], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function create(CommentRequest $request, Comment $comment){
        try{
            $comment->fill($request->validated());
            $comment->save();
            return response()->json([ApiStatus::Success,'Added','comment'=>$comment], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function update(CommentRequest $request, $id){
        try{
            $comment = Comment::findorfail($id);
            $comment->description = $request->description;
            $comment->commented_date = $request->commented_date;
            $comment->user_id = $request->user_id;
            $comment->report_id = $request->report_id;
            $comment->save();
            return response()->json([ApiStatus::Success,'Updated','comment'=>$comment],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id, Comment $comment){
        try{
            return $comment->findorfail($id)->delete();
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getCommentUsers($id){
        try{
            $comment = Comment::findOrFail($id);
            $users = $comment->user()->get();
            return response()->json([ApiStatus::Success,'Users associated with this comment fetched','users'=>$users],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
