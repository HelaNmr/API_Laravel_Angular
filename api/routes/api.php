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


Route::post('register', 'API\AuthController@register');
Route::post('login', 'API\AuthController@login');
Route::middleware('auth:api')->group(function () {

    Route::resource('products', 'API\ProductController');
    Route::resource('tickets', 'API\TicketController');
    Route::post('tickets/{id}/addReply', 'API\TicketController@addReply');
    Route::get('tickets/{id}/replies', 'API\TicketController@replies');
    Route::get('logout', 'API\AuthController@logout');

});
