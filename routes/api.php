<?php

    use Illuminate\Http\Request;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */

    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::any('/login', 'BasicAuthController@login')->name('login');
    Route::post('/logout', 'BasicAuthController@logout')->name('logout');

    Route::group(['middleware' => ['auth:api', 'jwt-auth'], 'guard' => 'api'], function () {
        Route::apiResource('users', 'UsersController');
        Route::apiResource('users_roles', 'UsersRolesController');
    });


