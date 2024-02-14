<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Http\Requests\IssueType\IssueTypeRequest;
use App\Models\IssueType;
use Exception;

class IssueTypeController extends Controller
{
    public function getAll(){
        try{
            $issueType = IssueType::all();
            return response()->json([ApiStatus::Success,'All data fetched','issueType'=>$issueType], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    public function getById($id){
        try{
            $issueType = IssueType::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','issueType'=>$issueType], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function create(IssueTypeRequest $request, IssueType $issueType){
        try{
            $issueType->fill($request->validated());
            $issueType->save();
            return response()->json([ApiStatus::Success,'Added','issueType'=>$issueType], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function update(IssueTypeRequest $request, $id){
        try{
            $issueType = IssueType::findorfail($id);
            $issueType->title = $request->title;
            $issueType->description = $request->description;
            $issueType->save();
            return response()->json([ApiStatus::Success,'Updated','issueType'=>$issueType],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function delete($id){
        try{
            $issueType =IssueType::findorfail($id);
            $issueType->delete();
            return null;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
