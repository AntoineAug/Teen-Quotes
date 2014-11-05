<?php namespace TeenQuotes\Comments\Repositories;

use TeenQuotes\Quotes\Models\Quote;
use TeenQuotes\Users\Models\User;

interface CommentRepository {

	/**
	 * Retrieve a comment thanks to its ID
	 * @param  int $id
	 * @return TeenQuotes\Comments\Models\Comment
	 */
	public function findById($id);

	/**
	 * Retrieve a comment thanks to its ID and add the related quote
	 * @param  int $id 
	 * @return TeenQuotes\Comments\Models\Comment
	 */
	public function findByIdWithQuote($id);

	/**
	 * List quotes for a given quote, page and pagesize
	 * @param  int $quote_id 
	 * @param  int $page     
	 * @param  int $pagesize
	 * @return Illuminate\Database\Eloquent\Collection
	 */
	public function indexForQuote($quote_id, $page, $pagesize);

	/**
	 * List quotes for a given quote, page and pagesize and add the related quotes
	 * @param  int $quote_id 
	 * @param  int $page     
	 * @param  int $pagesize
	 * @return Illuminate\Database\Eloquent\Collection
	 */
	public function indexForQuoteWithQuote($quote_id, $page, $pagesize);

	/**
	 * Post a comment on a quote
	 * @param  TeenQuotes\Quotes\Models\Quote  $q
	 * @param  TeenQuotes\Users\Models\User   $u
	 * @param  string $content
	 * @return TeenQuotes\Comments\Models\Comment
	 */
	public function create(Quote $q, User $u, $content);

	/**
	 * Update the content of a comment
	 * @param  TeenQuotes\Comments\Models\Comment|int   $c
	 * @param  string $content
	 * @return TeenQuotes\Comments\Models\Comment
	 */
	public function update($c, $content);

	/**
	 * Delete a comment
	 * @param  int $id 
	 * @return TeenQuotes\Comments\Models\Comment
	 */
	public function delete($id);
}