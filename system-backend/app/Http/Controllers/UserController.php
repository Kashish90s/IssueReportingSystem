<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Enums\Status;
use App\Enums\UserType;
use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Exception;

class UserController extends Controller
{

    public function getAll(){
        try{
            $user = User::all();
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

    public function update(UserRequest $request, $id){
        try{
            $user = User::findorfail($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->code = $request->code;
            $user->password = $request->password;
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
}
