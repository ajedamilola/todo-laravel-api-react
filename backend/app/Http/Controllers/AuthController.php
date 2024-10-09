<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function Login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|string|email|max:255",
            "password" => "required|string|min:8"
        ]);
        if ($validator->fails()) {
            return response(["err" => $validator->errors()], 400);
        }
        $data = $validator->getData();
        $user = User::where("email", $data["email"])->first();
        if (!$user || !Hash::check($data["password"], $user->password)) {
            return response([
                "err" => "Invalid credentials"
            ], 401);
        }
        //Ensuring just one token is created
        $tokens = $user->tokens()->count();
        if ($tokens > 0) {
            $user->tokens()->delete();
        }
        $token = $user->createToken("auth_token")->plainTextToken;
        return response([
            "access_token" => $token,
            "user" => $user
        ]);
    }

    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|string|min:8|confirmed"
        ]);
        if ($validator->fails()) {
            return response(["err" => $validator->errors()], 400);
        }
        $user = User::create($validator->getData());
        $token = $user->createToken("auth_token")->plainTextToken;
        return response([
            "access_token" => $token,
            "user" => $user
        ]);
    }
}
