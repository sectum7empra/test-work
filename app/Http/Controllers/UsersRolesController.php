<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersRolesController extends Controller
{
    /**
     * Display a list of user roles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = auth()->user();

        if($user->role_id > 2){
            abort(403);
        }
        $roles = \TCG\Voyager\Models\Role::select(['id', 'name', 'display_name'])->get();

        return response()->json($roles)->header('X-Total-Count', $roles->count());

    }

    /**
     * Display the role information.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = auth()->user();

        if($user->role_id > 2){
            abort(403);
        }
        $roles = \TCG\Voyager\Models\Role::select(['id', 'name', 'display_name'])->where('id', '=', $id)->first();

        return response()->json($roles);
    }
}
