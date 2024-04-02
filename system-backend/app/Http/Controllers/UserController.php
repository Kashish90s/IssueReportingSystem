<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Enums\Status;
use App\Enums\UserType;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function getAll(){
        try{
            $user = User::query()->orderBy('id','desc')->paginate(15);
            return response()->json([ApiStatus::Success,'All data fetched','user'=>$user], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $user = User::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','user'=>$user], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function create(UserRequest $request, User $user){
        try{
            $user->fill($request->validated());
            $user->save();
            return response()->json([ApiStatus::Success,'Added','user'=>$user], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function update(UpdateUserRequest $request, $id){
        try{
            $user = User::findorfail($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->code = $request->code;
            $user->dob = $request->dob;
            $user->google_id = $request->google_id;
            $user->type = $request->type ?? UserType::Client();
            $user->save();
            return response()->json([ApiStatus::Success,'Updated','user'=>$user],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id, User $user){
        try{
            return $user->findorfail($id)->delete();
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function toggleStatus($id, User $user){
        try{
            $user = $user->findorfail($id);
            if($user->status == Status::Active){
               $user->status = Status::Inactive;
            }
            else{
                $user->status = Status::Active;
            }
            $user->save();
            return response()->json([ApiStatus::Success,'Updated','user'=>$user],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function toggleFlagged($id, User $user){
        try{
            $user =$user->findorfail($id);
            $user->flagged = !$user->flagged;
            $user->save();
            return response()->json([ApiStatus::Success,'Updated','user'=>$user],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function getReports($id){
        try{
            $user = User::findorfail($id);
            $reports = $user->reports()->get();
            return response()->json([ApiStatus::Success,'All reports of this user fetched','reports'=>$reports],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getComments($id){
        try{
            $user = User::findorfail($id);
            $comments = $user->comments()->get();
            return response()->json([ApiStatus::Success,'All comments of this user fetched','comments'=>$comments],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getNotifications($id){
        try{
            $user = User::findorfail($id);
            $notification = $user->notifications()->get();
            return response()->json([ApiStatus::Success,'All notification of this user fetched','notification'=>$notification],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getImages($id){
        try{
            $user = User::findorfail($id);
            $image = $user->images()->get();
            return response()->json([ApiStatus::Success,'All image of this user fetched','image'=>$image],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function changePassword($id, UpdateUserRequest $request) {
        try {
            $user = User::findOrFail($id);
    
            if ($request->password != $request->confirmPassword) {
                throw new Exception("Password and confirm password are not the same");
            }
            if (!Hash::check($request->oldPassword, $user->password)) {
                throw new Exception("Old password did not match");
            }
            $user->password = Hash::make($request->password);
            $user->save();
    
            return response()->json([ApiStatus::Success, 'message' => 'Password changed', 'user' => $user], 200);
        } catch (Exception $e) {
            return response()->json([ApiStatus::Failure, 'message' => $e->getMessage()], 200);
        }
    }
    
}
