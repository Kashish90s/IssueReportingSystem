<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Models\User;
use Exception;
use Faker\Extension\Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct(User $user) {
        $this->helper = new Helper()    ;
        $this->userModel = $user;
    }

    public function getAll(){
        try{
            DB::beginTransaction();
            $user = $this->userModel->getAll();
            DB::commit();
            $response = $this->helper->getApiResponse(ApiStatus::Success, "All Data Fetched", ['user'=>$user]);
            return response()->json($response, 200);
        }catch(Exception $e){
            DB::rollBack();
            throw new Exception($e);
            $response = $this->helper->getApiResponse(ApiStatus::Failure, "Failed", null);
            return response()->json($response, 200);
        }
    }
}
