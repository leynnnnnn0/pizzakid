<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\StampCode;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IssueStampController extends Controller
{
    public function index()
    {
        $code = $this->generate();
        return Inertia::render('Business/IssueStamp/Index', [
            'code' => $code
        ]);
    }

    public function generate()
    {
        StampCode::whereNull('used_at')
            ->where('created_at', '>=', Carbon::now()->subMinutes(15))
            ->update([
                'is_expired' => true
            ]);

        do {
            $code = strtoupper(Str::random(8));
        } while (StampCode::where('code', $code)->exists());

        $stampCode = StampCode::create([
            'business_id' => Auth::user()->business->id,
            'customer_id' => null,
            'code' => $code,
            'used_at' => null,
            'is_expired' => false
        ]);

        return [
            'success' => true,
            'code' => $stampCode->code,
            'qr_url' => "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data={$stampCode->code}",
            'created_at' => $stampCode->created_at->format('M d, Y h:i A')
        ];
    }
}
