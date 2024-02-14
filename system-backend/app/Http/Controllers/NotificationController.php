<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\Notification\NotificationRequest;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getAll(){
        try{
            $notification = Notification::all();
            return response()->json([ApiStatus::Success,'All data fetched','notification'=>$notification], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $notification = Notification::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','notification'=>$notification], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function create(NotificationRequest $request, Notification $notification){
        try{
            $notification->fill($request->validated());
            $notification->save();
            return response()->json([ApiStatus::Success,'Added','notification'=>$notification], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function update(NotificationRequest $request, $id){
        try{
            $notification = Notification::findorfail($id);
            $notification->title = $request->name;
            $notification->description = $request->email;
            $notification->notification_date = $request->code;
            $notification->user_id = $request->password;
            $notification->report_id = $request->dob;
            $notification->image_id = $request->google_id;
            $notification->save();
            return response()->json([ApiStatus::Success,'Updated','notification'=>$notification],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id){
        try{
            $notification =Notification::findorfail($id);
            $notification->delete();
            return null;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
