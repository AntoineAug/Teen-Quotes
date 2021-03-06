<?php

/*
 * This file is part of the Teen Quotes website.
 *
 * (c) Antoine Augusti <antoine.augusti@teen-quotes.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace TeenQuotes\AdminPanel\Helpers;

class Moderation
{
    /**
     * The moderation type.
     *
     * @var string
     */
    private $type;

    /**
     * The constructor.
     *
     * @param string $type The moderation decision
     *
     * @throws \InvalidArgumentException If the moderation is not supported
     */
    public function __construct($type)
    {
        $this->guardType($type);

        $this->type = $type;
    }

    /**
     * Tell if the moderation decision was 'approve'.
     *
     * @return bool
     */
    public function isApproved()
    {
        return $this->type === 'approve';
    }

    /**
     * Get the moderation decision.
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Get available types of moderation.
     *
     * @return array
     */
    public static function getAvailableTypes()
    {
        return ['approve', 'unapprove', 'alert'];
    }

    /**
     * Present available types of moderation.
     *
     * @return string
     */
    public static function presentAvailableTypes()
    {
        return implode('|', self::getAvailableTypes());
    }

    /**
     * Guard the moderation decision against available values.
     *
     * @param string $type The moderation decision to test
     *
     * @throws \InvalidArgumentException If the type is not supported
     */
    private function guardType($type)
    {
        $error = 'Wrong type. Got '.$type.'. Available values: '.$this->presentAvailableTypes();

        if (!in_array($type, self::getAvailableTypes())) {
            throw new InvalidArgumentException($error);
        }
    }
}
