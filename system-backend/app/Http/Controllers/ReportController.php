<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Enums\IssueStatus;
use App\Http\Requests\Report\ReportRequest;
use App\Models\Image;
use App\Models\Location;
use App\Models\Report;
use Exception;

class ReportController extends Controller
{
    public function getAll()
    {
        try{
            $report = Report::with('user')->orderBy('id','desc')->paginate(12);
            return response()->json([ApiStatus::Success,'All report data fetched','report'=>$report],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], null);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getById($id)
    {
        try{
            $report = Report::findorfail($id);
            return response()->json([ApiStatus::Success,'Id found and data fetched','report'=>$report], 200);;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function create(ReportRequest $request, Report $report, Location $location){
        try {
            $image = new Image();
            if ($request->hasFile('image_holder')) {
                $media = $request->file('image_holder');
                $filename = $media->getClientOriginalName();
                $media->move('./storage', $filename);
                $image->image_holder = $filename;
            }
    
            $image->user_id = $request->user_id;
            $image->save();
    
            $location->street_name = $request->street_name;
            $location->ward = $request->ward;
            $location->zip_code = $request->zip_code;
            $location->save();
    
            $report->fill($request->validated());
            $report->image_id = $image->id;
            $report->location()->associate($location); 
            $report->save();
    
            return response()->json([ApiStatus::Success, 'Added', 'report' => $report], 200);
        } catch (Exception $e) {
            return response()->json([ApiStatus::Failure, 'message' => $e->getMessage()], 200);
        }
    }
    

    public function update(ReportRequest $request, $id){
        try{

            $report = Report::findorfail($id);
            $report->title = $request->title;
            $report->description = $request->description;
            $report->reported_date = $request->reported_date;
            $report->user_id = $request->user_id;
            $report->location_id = $request->location_id;
            $report->issue_status = $request->issue_status ?? IssueStatus::Processing;
            $report->issue_type = $request->issue_type;
            $report->image_id = $request->image_id;
            $report->votes = $request->votes;
            $report->save();
            return response()->json([ApiStatus::Success,'Updated','report'=>$report],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function delete($id, Report $report){
        try{
            return $report->findorfail($id)->delete();
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function toggleIssueStatus($id, Report $report){
        try{
            $report = $report->findorfail($id);
            if($report->status == IssueStatus::Processing){
               $report->status = IssueStatus::Complete;
            }
            else{
                $report->status = IssueStatus::Processing;
            }
            $report->save();
            return response()->json([ApiStatus::Success,'Updated','report'=>$report],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function getReportUsers($id){
        try{
            $report = Report::findOrFail($id);
            $users = $report->user()->get();
            return response()->json([ApiStatus::Success,'Users associated with this report fetched','users'=>$users],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function getComments($id){
        try{
            $report = Report::findOrFail($id);
            $comment = $report->comments()->get();
            return response()->json([ApiStatus::Success,'comments associated with this report fetched','comment'=>$comment],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getLocation($id){
        try{
            $report = Report::findOrFail($id);
            $location = $report->location()->get();
            return response()->json([ApiStatus::Success,'locations associated with this report fetched','location'=>$location],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getIssueType($id){
        try{
            $report = Report::findOrFail($id);
            $issue_type = $report->issueType()->get();
            return response()->json([ApiStatus::Success,'issue_type associated with this report fetched','issue_type'=>$issue_type],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getImage($id){
        try{
            $report = Report::findOrFail($id);
            $image = $report->image()->get();
            return response()->json([ApiStatus::Success,'image associated with this report fetched','image'=>$image],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
    public function getNotification($id){
        try{
            $report = Report::findOrFail($id);
            $notification = $report->notification()->get();
            return response()->json([ApiStatus::Success,'notification associated with this report fetched','notification'=>$notification],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }
}
