<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
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
    public function create(UserRequest $request){
        try{
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->code = $request->code;
            $user->password = $request->password;
            $user->dob = $request->dob;
            $user->google_id = $request->google_id;
            $user->type = $request->type;
            $user->status = $request->status;
            $user->flagged = $request->flagged;
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
            $user->type = $request->type;
            $user->status = $request->status;
            $user->flagged = $request->flagged;
            $user->save();
            return response()->json([ApiStatus::Success,'Updated','user'=>$user],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
