<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::where("user_id", request()->user()->id)->orderBy("created_at", "desc")->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            "title" => "required|string|max:50",
        ]);
        if ($validator->fails()) {
            return response(["err" => $validator->errors()], 400);
        }
        $todo = Todo::create([
            "title" => $request->string("title"),
            "description" => $request->string("description"),
            "completed" => $request->boolean("completed"),
            "user_id" => $request->user()->id,
        ]);
        return $todo;
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        if ($todo->user_id != request()->user()->id) {
            return response(["err" => "Unauthorized"], 401);
        }
        return $todo;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
        if ($todo->user_id != request()->user()->id) {
            return response(["err" => "Unauthorized"], 401);
        }
        $validator = Validator::make($request->all(), [
            "title" => "required"
        ]);
        if ($validator->fails()) {
            return response(["err" => $validator->errors()], 401);
        }
        $todo->title = $request->input("title");
        $todo->description = $request->input("description");
        $todo->completed = $request->boolean("completed", $todo->completed);
        $todo->save();
        return $todo;
    }

    public function toggle(Todo $todo)
    {
        //
        if ($todo->user_id != request()->user()->id) {
            return response(["err" => "Unauthorized"], 401);
        }
        $todo->completed = !$todo->completed;
        $todo->save();
        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
        if ($todo->user_id != request()->user()->id) {
            return response(["err" => "Unauthorized"], 401);
        }
        $todo->delete();
        return response(["message" => "Todo deleted successfully"], 200);
    }
}
