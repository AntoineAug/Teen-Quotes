<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>{{ isset($pageTitle) ? $pageTitle : Lang::get('layout.nameWebsite') }}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="{{isset($pageDescription) ? $pageDescription : ''}}">
	{{ HTML::style('//netdna.bootstrapcdn.com/bootswatch/3.1.1/cosmo/bootstrap.min.css'); }}
	{{ HTML::style('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css'); }}
	{{ HTML::style('assets/css/screen.css'); }}
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
</head>
<body>
	<div class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a href="../" class="logo"></a>
				<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div class="navbar-collapse collapse" id="navbar-main">
				<ul class="nav navbar-nav">
					<li>
						<a href="/"><i class="fa fa-user"></i> {{ Lang::get('layout.login') }}</a>
					</li>
					<li>
						<a href="/"><i class="fa fa-random"></i>{{ Lang::get('layout.randomQuotes') }}</a>
					</li>
					<li>
						<a href="/"><i class="fa fa-comment"></i>{{ Lang::get('layout.addQuote') }}</a>
					</li>
					<li>
						<a href="/"><i class="fa fa-mobile fa-lg"></i>{{ Lang::get('layout.apps') }}</a>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right hidden-sm hidden-xs">
					<li>
						<a href="http://twitter.com/ohteenquotes" class="twitter-follow-button" data-show-count="true" data-lang="en">Follow @ohteenquotes</a>
					</li>
				</ul>

			</div>
		</div>
	</div><!-- END NAVBAR -->