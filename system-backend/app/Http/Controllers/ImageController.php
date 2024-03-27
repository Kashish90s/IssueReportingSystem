<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\Image\ImageRequest;
use App\Models\Image;
use Exception;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{

public function getAll(){
    try {
        $images = Image::all();

        $imagesWithContent = $images->map(function ($image) {
            $imageUrl = Storage::url($image->image_holder);
            $image->content_url = $imageUrl;
            return $image;
        });

        return response()->json([ApiStatus::Success, 'All image data fetched', 'images' => $imagesWithContent], 200);
    } catch (Exception $e) {
        return response()->json([ApiStatus::Failure, 'message' => $e->getMessage()], null);
    }
}

public function getById($id){
    try {
        $image = Image::findOrFail($id);
        $imageUrl = Storage::url($image->image_holder);

        return response()->json([ApiStatus::Success, 'Image found', 'image_url' => $imageUrl], 200);
    } catch (Exception $e) {
        return response()->json([ApiStatus::Failure, 'message' => $e->getMessage()], 200);
    }
}



    public function create(ImageRequest $request, Image $image){
        try{

            if($request->hasFile('image_holder')){
                $media = $request->file('image_holder');
                $filename = $media->getClientOriginalName();
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
            if($request->hasFile('image_holder')){
                $media = $request->file('image_holder');
                $filename = $media->getClientOriginalName();
                $media->move('./storage',$filename);
                $image->image_holder = $filename;
            }
            $image->user_id = $request->user_id;
            $image->save();
            return response()->json([ApiStatus::Success,'Updated','image'=>$image],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id, Image $image){
        try{
            return $image->findorfail($id)->delete();
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getImageUsers($id){
        try{
            $image = Image::findOrFail($id);
            $users = $image->user()->get();
            return response()->json([ApiStatus::Success,'Users associated with this image fetched','users'=>$users],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getImageReport($id){
        try{
            $image = Image::findOrFail($id);
            $reports = $image->report()->get();
            return response()->json([ApiStatus::Success,'report associated with this image fetched','reports'=>$reports],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
