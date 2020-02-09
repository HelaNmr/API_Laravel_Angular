<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Info(
 * description="",
 * version="1.0.0",
 * title="Ticket App API",
 * )
 **/

/**
 * @OA\SecurityScheme(
 * securityScheme="bearerAuth",
 * type="http",
 * scheme="bearer",
 * bearerFormat="OAuth"
 * ),
 **/
class AuthController extends Controller
{

    /**
     * @OA\Post(
     * path="/api/register",
     * tags={"Register"},
     * summary="Register",
     * operationId="register",
     *
     * @OA\Parameter(
     * name="name",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Parameter(
     * name="email",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Parameter(
     * name="password",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Parameter(
     * name="password_confirmation",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="Success",
     * @OA\MediaType(
     * mediaType="application/json",
     * )
     * ),
     * @OA\Response(
     * response=401,
     * description="Unauthorized"
     * ),
     * @OA\Response(
     * response=400,
     * description="Invalid request"
     * ),
     * @OA\Response(
     * response=404,
     * description="not found"
     * ),
     * )
     **/
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response()->json(['user' => $user, 'access_token' => $accessToken]);

    }

    /**
     * @OA\Post(
     * path="/api/login",
     * tags={"Login"},
     * summary="Login",
     * operationId="login",
     *
     * @OA\Parameter(
     * name="email",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Parameter(
     * name="password",
     * in="query",
     * required=true,
     * @OA\Schema(
     * type="string"
     * )
     * ),
     * @OA\Response(
     * response=200,
     * description="Success",
     * @OA\MediaType(
     * mediaType="application/json",
     * )
     * ),
     * @OA\Response(
     * response=401,
     * description="Unauthorized"
     * ),
     * @OA\Response(
     * response=400,
     * description="Invalid request"
     * ),
     * @OA\Response(
     * response=404,
     * description="not found"
     * ),
     * )
     **/
    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid credentials']);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response()->json(['email' => auth()->user()->email, 'password' => auth()->user()->getAuthPassword(), 'access_token' => $accessToken]);

    }


    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout()
    {
        Auth::user()->token()->revoke();
        //$request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
