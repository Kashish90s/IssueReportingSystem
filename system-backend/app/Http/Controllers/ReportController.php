<?php

namespace App\Http\Controllers;

use App\Enums\ApiStatus;
use App\Enums\IssueStatus;
use App\Http\Requests\Report\ReportRequest;
use App\Models\IssueType;
use App\Models\Report;
use Exception;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        try{
            $report = Report::all();
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

    public function create(ReportRequest $request, Report $report){
        try{
            $report->fill($request->validated());
            $report->save();
            return response()->json([ApiStatus::Success,'Added','report'=>$report], 200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
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
            $report->issue_status = $request->issue_status;
            $report->issue_type = $request->issue_type;
            $report->image_id = $request->image_id;
            $report->votes = $request->votes;
            $report->save();
            return response()->json([ApiStatus::Success,'Updated','report'=>$report],200);
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function delete($id){
        try{
            $report =Report::findorfail($id);
            $report->delete();
            return null;
        }catch(Exception $e){
            return response()->json([ApiStatus::Failure,'message' => $e->getMessage()], 200);
        }
    }

    public function toggleIssueStatus($id){
        try{
            $report = Report::findorfail($id);
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
}
