<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Business;
use Exception;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function index()
    {
        try{
            $businesses = Business::where('id', '!=', 1)->get();
            return response()->json([
                'success' => true,
                'data' => $businesses->map(function($business){
                    return [
                        'id' => $business->id,
                        'name' => $business->name,
                        'user_id' => $business->user_id,
                        'created_at' => $business->created_at,
                    ];
                })
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
