<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\Image\ImageRequest;
use App\Models\Image;
use Exception;

class ImageController extends Controller
{
    public function getAll(){
        try{
            $image = Image::all();
            return response()->json([ApiStatus::Success,'All data fetched','image'=>$image], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $image = Image::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','image'=>$image], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }


    public function create(ImageRequest $request, Image $image){
        try{

            if($request->hasFile('image_holder')){
                $media = $request->file('image_holder');
                $filename = $media->getClientOriginalName() . '.' . $media->getClientOriginalExtension();
                $media->move('./storage',$filename);
                $image->image_holder = $filename;
            }
            $image->user_id = $request->user_id;
            $image->save();
            return response()->json([ApiStatus::Success,'Added','image'=>$image], 200);
        }catch(Exception $e){
            dd($e);
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }



    public function update(ImageRequest $request, $id){
        try{
            $image = Image::findorfail($id);
            $image->image_holder = $request->image_holder;
            $image->user_id = $request->user_id;
            $image->save();
            return response()->json([ApiStatus::Success,'Updated','image'=>$image],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id){
        try{
            $image =Image::findorfail($id);
            $image->delete();
            return null;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
