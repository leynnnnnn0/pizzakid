<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\StampCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StampCodeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $stampCodes = StampCode::where('business_id', Auth::user()->business->id)
            ->with('customer:id,username,email')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('code', 'like', "%{$search}%")
                      ->orWhereHas('customer', function ($customerQuery) use ($search) {
                          $customerQuery->where('username', 'like', "%{$search}%")
                                      ->orWhere('email', 'like', "%{$search}%");
                      });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Business/StampCode/Index', [
            'stampCodes' => $stampCodes,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}