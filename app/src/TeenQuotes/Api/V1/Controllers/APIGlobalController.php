<?php namespace TeenQuotes\Api\V1\Controllers;

use BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\URL;
use LucaDegasperi\OAuth2Server\Facades\AuthorizationServerFacade as AuthorizationServer;
use LucaDegasperi\OAuth2Server\Facades\ResourceServerFacade as ResourceServer;
use TeenQuotes\Http\Facades\Response;
use User;

class APIGlobalController extends BaseController {

	public function showWelcome()
	{
		return Response::json([
			'status'            => 'You have arrived',
			'message'           => 'Welcome to the Teen Quotes API',
			'version'           => '1.0alpha',
			'url_documentation' => 'https://github.com/TeenQuotes/api-documentation',
			'contact'           => 'antoine.augusti@teen-quotes.com',
		], 200);
	}

	public function postOauth()
	{
		return AuthorizationServer::performAccessTokenFlow();
	}

	/**
	 * Paginate content for the API after a search for example
	 * @param  int $page The current page number
	 * @param  int $pagesize The number of items per page
	 * @param  int $totalContent The total number of items for the search
	 * @param  Collection $content The content we searched for
	 * @param  string $contentName The name of the content. Example: quotes|users
	 * @return array A big array
	 */
	public static function paginateContent($page, $pagesize, $totalContent, $content, $contentName = 'quotes')
	{
		$totalPages = ceil($totalContent / $pagesize);
		
		$data = [
			$contentName          => $content,
			'total_'.$contentName => $totalContent,
			'total_pages'         => $totalPages,
			'page'                => (int) $page,
			'pagesize'            => (int) $pagesize,
			'url'                 => URL::current()
		];
		
		$additionalGet = null;
		if (Input::has('quote'))
			$additionalGet = '&quote=true';

		// Add next page URL
		if ($page < $totalPages) {
			$data['has_next_page'] = true;
			$data['next_page'] = $data['url'].'?page='.($page + 1).'&pagesize='.$pagesize.$additionalGet;
		}
		else
			$data['has_next_page'] = false;

		// Add previous page URL
		if ($page >= 2) {
			$data['has_previous_page'] = true;
			$data['previous_page'] = $data['url'].'?page='.($page - 1).'&pagesize='.$pagesize.$additionalGet;
		}
		else
			$data['has_previous_page'] = false;

		return $data;
	}

	public function getPage()
	{
		return max(1, Input::get('page', 1));
	}

	/**
	 * Retrieve the authenticated user from the website or via the API
	 * @return \User The user object
	 */
	public function retrieveUser()
	{
		return ResourceServer::getOwnerId() ? User::find(ResourceServer::getOwnerId()) : Auth::user();
	}
}