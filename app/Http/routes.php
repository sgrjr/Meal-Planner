<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('meals-list')->withEncryptedCsrfToken(Crypt::encrypt(csrf_token()));
});

// Route group for API versioning
Route::group(array('prefix' => 'api/v1', 'before' => ''), function()
{
	Route::get('meals','MealController@index');
	Route::get('meal/{mealId}/comments','MealController@getComments');
	Route::post('meal/{mealId}/comments','MealController@createComment');
	Route::post('mealplan','MealController@saveMealPlan');
	
	Route::get('recipe/{recipeId}','MealController@recipe');
	Route::post('recipe/{recipeId}/edit}','MealController@editRecipe');
	
});