<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class FeedbackController extends Controller
{
    function insertItem(Request $request){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|regex:/([+78])[0-9]{10}/',
            'email' => 'required|email',
            'message' => 'required|max:255',
        ]);

        $record= new App\Feedback;
        $record->name=$request->get('name');
        $record->phone=$request->get('phone');
        $record->email=$request->get('email');
        $record->message=$request->get('message');
        $record->save();
        return response()->json(['result'=>true]);
    }
}
