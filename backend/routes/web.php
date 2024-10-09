<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::fallback(function () {
    return response()->json(['err' => 'Resource Not Found!'], 404);
});
