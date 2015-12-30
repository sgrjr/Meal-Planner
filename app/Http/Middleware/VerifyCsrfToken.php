<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
	//this is a temporary hack, fix why I can't get ajax post to work ?????
        '/api/v1/mealplan',
		'/api/v1/recipe/*'
    ];
}
