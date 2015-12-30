<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //	
		return \Response::json(array(
			'error' => false,
			'meals' => $this->one('recipes')),
			200
		);

    }
	
	public function recipe($recipeId)
    {
        //	
		return \Response::json(array(
			'error' => false,
			'recipe' => $this->getRecipeData($recipeId)),
			200
		);

    }
	
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }
	
	    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveMealPlan(Request $request)
    {

		$contents = $request->all();
		
		$random = round((microtime(true) - 1) * 1000, 0);
		$file = 'mealplans/plan_'.$random.'.json';
		
		$bytes_written = \File::put($file, $contents['data']);
		
		if ($bytes_written === false)
		{
			return \Response::json(array(
				'error' => true,
				'message'=>'Error writing to file'
				),
				200
			);
	
		}
		
        return \Response::json(array(
			'error' => false
			),
			200
		);
    }
	
	    public function editRecipe(Request $request)
    {

		$contents = $request->all();
		
		$random = round((microtime(true) - 1) * 1000, 0);
		$file = 'recipes/'.$contents['id'].'_'.$random.'.json';
		
		$bytes_written = \File::put($file, $contents['data']);
		
		if ($bytes_written === false)
		{
			return \Response::json(array(
				'error' => true,
				'message'=>'Error writing to file'
				),
				200
			);
	
		}
		
        return \Response::json(array(
			'error' => false
			),
			200
		);
    }
	
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
	
	public function getComments($id)
    {
		
       	return \Response::json(array(
			'error' => false,
			'comments' => json_decode('[
			  {"author": "Pete Hunt", "text": "This is one comment"},
			  {"author": "Jordan Walke", "text": "This is *another* comment"}
			]'),true),
			200
		);
    }
	
	public function createComment($id)
    {
		
       	return \Response::json(array(
			'error' => false,
			'comments' => json_decode('[
			  {"author": "Pete Hunt", "text": "This is one comment"},
			  {"author": "Jordan Walke", "text": "This is *another* comment"}
			]'),true),
			200
		);
    }
	
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
	
	//////////////////////////////
	///MODEL
	//////////////////////////////
		
		
		function getRecipeData ($recipeId){
			
			$recipeFile = 'recipes/00'.$recipeId.'.json';

			$str = file_get_contents($recipeFile);
			
			return json_decode($str, true);
			
		}
		
		function one ($dir){
			
			$recipes = array_diff(scandir($dir), array('..', '.'));
			$listOfLinks = [];
			
			foreach ($recipes AS $r){

				$str = file_get_contents("recipes/" . $r);
				
				$listOfLinks[] = json_decode($str, true);
			}
			
			return $listOfLinks;
			
		}
}
