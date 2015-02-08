<?php

class TagRepoCest {

	/**
	 * @var TeenQuotes\Tags\Repositories\TagRepository
	 */
	private $repo;

	public function _before()
	{
		$this->repo = App::make('TeenQuotes\Tags\Repositories\TagRepository');
	}

	public function testCreate(IntegrationTester $I)
	{
		$name = 'Foobar';

		$this->repo->create($name);

		$I->seeRecord('tags', compact('name'));
	}

	public function testGetByName(IntegrationTester $I)
	{
		$name = 'Foobar';

		$I->insertInDatabase(1, 'Tag', compact('name'));

		$tag = $this->repo->getByName($name);

		$I->assertEquals($tag->name, $name);

		// Non existing tag
		$I->assertNull($this->repo->getByName('notfound'));
	}

	public function testTagQuote(IntegrationTester $I)
	{
		$I->insertInDatabase(1, 'Quote');
		$quote = $I->insertInDatabase(1, 'Quote');
		$tag = $I->insertInDatabase(1, 'Tag', compact('name'));

		$this->repo->tagQuote($quote, $tag);

		$I->seeRecord('quote_tag', ['quote_id' => $quote->id, 'tag_id' => $tag->id]);
	}

	public function testUntagQuote(IntegrationTester $I)
	{
		$I->insertInDatabase(1, 'Quote');
		$quote = $I->insertInDatabase(1, 'Quote');
		$tag = $I->insertInDatabase(1, 'Tag', compact('name'));

		$this->repo->tagQuote($quote, $tag);

		// Assert quote was tagged
		$I->seeRecord('quote_tag', ['quote_id' => $quote->id, 'tag_id' => $tag->id]);

		// Untag the quote
		$this->repo->untagQuote($quote, $tag);
		$I->dontSeeRecord('quote_tag', ['quote_id' => $quote->id, 'tag_id' => $tag->id]);
	}
}