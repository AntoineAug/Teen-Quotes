<?php namespace TeenQuotes\Tags\Repositories;

use TeenQuotes\Tags\Models\Tag;
use TeenQuotes\Quotes\Models\Quote;

interface TagRepository {

	/**
	 * Create a new tag
	 *
	 * @param string $name
	 * @return \TeenQuotes\Tags\Models\Tag
	 */
	public function create($name);

	/**
	 * Get a tag thanks to its name
	 *
	 * @param string $name
	 * @return \TeenQuotes\Tags\Models\Tag|null
	 */
	public function getByName($name);

	/**
	 * Add a tag to a quote
	 *
	 * @param \TeenQuotes\Quotes\Models\Quote $q
	 * @param \TeenQuotes\Tags\Models\Tag $t
	 */
	public function tagQuote(Quote $q, Tag $t);

	/**
	 * Remove a tag from a quote
	 *
	 * @param \TeenQuotes\Quotes\Models\Quote $q
	 * @param \TeenQuotes\Tags\Models\Tag $t
	 */
	public function untagQuote(Quote $q, Tag $t);
}