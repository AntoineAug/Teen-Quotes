<?php namespace TeenQuotes\Http\Facades;

use Illuminate\Support\Facades\Response as ResponseFacadeOriginal;
use TeenQuotes\Http\JsonResponse;

class Response extends ResponseFacadeOriginal {

	/**
	 * Return a new JSON response from the application.
	 *
	 * @param  string|array  $data
	 * @param  int    $status
	 * @param  array  $headers
	 * @param  int    $options
	 * @return TeenQuotes\Http\JsonResponse
	 */
	public static function json($data = array(), $status = 200, array $headers = array(), $options = 0)
	{
		return new JsonResponse($data, $status, $headers, $options);
	}
}