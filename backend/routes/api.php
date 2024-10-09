<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get("/unauthenticated", function () {
    return ["error" => ["Unauthenticated Request"]];
})->name("login");
Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::apiResource('/todos', TodoController::class)->middleware("auth:sanctum");
Route::patch('/todos/{todo}/toggle', [TodoController::class, 'toggle'])->middleware("auth:sanctum");
Route::fallback(function () {
    return response()->json(['err' => 'Specified Resource Not Found!'], 404);
});
