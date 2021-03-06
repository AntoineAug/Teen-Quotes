<?php

/*
 * This file is part of the Teen Quotes website.
 *
 * (c) Antoine Augusti <antoine.augusti@teen-quotes.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeenQuotes\Api\V1\Interfaces;

interface PageBuilderInterface
{
    /**
     * Build page parameters for a paginated response.
     *
     * @param int    $page       The current page
     * @param int    $pagesize   The number of elements per page
     * @param int    $totalPages The total number of pages
     * @param string $url        The URL of the endpoint
     * @param string $getParams  Additional get parameters
     *
     * @return array Keys: has_next_page, has_previous_page[, next_page, previous_page]
     */
    public function buildPagesArray($page, $pagesize, $totalPages, $url, $getParams);
}
