<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\Location\LocationRequest;
use App\Models\Location;
use App\Models\Notification;
use Exception;

class LocationController extends Controller
{
    public function getAll(){
        try{
            $location = Location::all();
            return response()->json([ApiStatus::Success,'All data fetched','location'=>$location], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $location = Notification::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','location'=>$location], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function create(LocationRequest $request, Location $location){
        try{
            $location->fill($request->validated());
            $location->save();
            return response()->json([ApiStatus::Success,'Added','location'=>$location], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function update(LocationRequest $request, $id){
        try{
            $location = Location::findorfail($id);
            $location->name = $request->name;
            $location->email = $request->email;
            $location->code = $request->code;
            $location->password = $request->password;
            $location->dob = $request->dob;
            $location->google_id = $request->google_id;
            $location->type = $request->type;
            $location->save();
            return response()->json([ApiStatus::Success,'Updated','location'=>$location],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id){
        try{
            $location =Location::findorfail($id);
            $location->delete();
            return null;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
