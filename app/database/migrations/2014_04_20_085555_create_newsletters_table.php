<?php

/*
 * This file is part of the Teen Quotes website.
 *
 * (c) Antoine Augusti <antoine.augusti@teen-quotes.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use TeenQuotes\Newsletters\Models\Newsletter;

class CreateNewslettersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::dropIfExists('newsletters');

        Schema::create('newsletters', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('type', Newsletter::getPossibleTypes())->default('weekly');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::drop('newsletters');
    }
}
