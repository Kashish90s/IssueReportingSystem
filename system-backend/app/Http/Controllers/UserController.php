<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function getAll(){
        try{
            DB::beginTransaction();
            $user = User::all();
            DB::commit();
            return response()->json([ApiStatus::Success,'user'=>$user], 200);
        }catch(Exception $e){
            DB::rollBack();
            throw new Exception($e);
            return response()->json([ApiStatus::Failure,'message' => $e], null);
        }
    }
}
