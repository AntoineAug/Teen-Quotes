@extends('layouts.page')

@section('content')
	<div id="contact-page">
		<h1><i class="fa fa-paper-plane"></i> {{ $title }}</h1>
		<div id="stay-in-touch">
			<h2>{{ $stayInTouchTitle }}</h2>
			{{ $stayInTouchContent }}
		</div>
		<div id="contact-info">
			<h2>{{ $chooseYourWeapon }}</h2>
			<ul>
				<li>
					<i class="fa fa-envelope-o"></i> {{ HTML::mailto($emailAddress) }}
				</li>
				<li>
					<i class="fa fa-twitter"></i> {{ HTML::link('https://twitter.com/'.str_replace('@', '', $twitterAccount), $twitterAccount) }}
				</li>
			</ul>
		</div>
	</div>
@stop