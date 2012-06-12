<?php
session_start();
error_reporting(E_ALL ^ E_NOTICE);

// INCLUSION DES FICHIERS
require "../kernel/config.php";
$db = mysql_connect($host, $user, $pass)  or die('Erreur de connexion '.mysql_error());
mysql_select_db($user,$db)  or die('Erreur de selection '.mysql_error()); 
require "../kernel/fonctions.php";
require '../lang/'.$language.'/general.php'; 


if(!empty($_COOKIE['mobile']))
	{
	$domaine = 'teen-quotes.com';
	setcookie("mobile", Yo, time()-4200);
	setcookie("mobile", 1 , time() -4200, null, '.'.$domaine.'', false, true);
	}

if ($_SESSION['logged'] == TRUE AND (empty($_SESSION['id']) OR empty($_SESSION['username']) OR empty($_SESSION['email']) OR empty($_SESSION['avatar'])))
	{
	deconnexion();
	}

if (isset($_COOKIE['Pseudo']) AND isset($_COOKIE['Pass']) AND $_SESSION['logged'] == FALSE)
	{
	$pseudo = mysql_real_escape_string($_COOKIE['Pseudo']);
	$pass = mysql_real_escape_string($_COOKIE['Pass']);
	$query_base = mysql_query("SELECT * FROM teen_quotes_account WHERE `username` ='$pseudo'");
	
	$retour_nb_pseudo = mysql_num_rows($query_base);
	if ($retour_nb_pseudo == '1')
		{				
		$sha = mysql_num_rows(mysql_query("SELECT id FROM teen_quotes_account WHERE `pass` = '$pass' AND `username` = '$pseudo'"));
		if ($sha == '1')
			{
			$compte = mysql_fetch_array($query_base);
			
			$_SESSION['logged'] = TRUE;
			$_SESSION['id'] = $compte['id'];										
			$_SESSION['security_level'] = $compte['security_level'];									
			$_SESSION['username'] = $compte['username'];
			$_SESSION['email'] = $compte['email'];
			$_SESSION['avatar'] = $compte['avatar'];
			
			$username = $_SESSION['username'];
			$id = $_SESSION['id'];
			$email = $compte['email'];
			$last_visit = $compte['last_visit'];
			$session_last_visit = $_SESSION['last_visit_user'];
				
			last_visit($session_last_visit,$last_visit,$id);
				
			if (empty($compte['birth_date']) AND empty($compte['title']) AND empty($compte['country']) AND empty($compte['about_me']) AND $compte['avatar']=="icon50.png" AND empty($compte['city']))
				{
				$_SESSION['profile_not_fullfilled'] = TRUE;
				}
			}
		}
	}

if ($_SESSION['logged'] == TRUE)
	{
	$username = $_SESSION['username'];
	$id = $_SESSION['id'];
	$email = $_SESSION['email'];
	$session_last_visit = $_SESSION['last_visit_user'];
	if (username_est_valide(strtolower($_SESSION['username'])) == FALSE AND $php_self != 'changeusername')
		{
		echo '<meta http-equiv="refresh" content="0;url=changeusername">';
		}
	if (isset($_COOKIE['Pseudo']) AND username_est_valide(strtolower($_SESSION['username'])) == TRUE AND username_est_valide($_SESSION['username']) == FALSE)
		{
		$_SESSION['username'] = strtolower($_SESSION['username']);
		}
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<?php 
// PERMET DE GERER LE TITRE DES PAGES DYNAMIQUES ET LES DESCRIPTION POUR LE SHARE SUR FB
if (isset($_GET['id_user'])) 
	{
	$id_user = mysql_real_escape_string($_GET['id_user']);
	$php_self = 'user-'.$id_user.'';
	$result = mysql_fetch_array(mysql_query("SELECT username FROM teen_quotes_account where id = '".$id_user."'"));
	$username_title = $result['username'];
	echo '<title>Teen Quotes | '.$username_title.'</title>';
	echo "\r\n";
	echo '<meta name="description" content="'.$username_title.'\'s profile on Teen Quotes" />';
	}
elseif (isset($_GET['id_quote'])) 
	{
	$id_quote = mysql_real_escape_string($_GET['id_quote']);
	$php_self = 'quote-'.$id_quote.'';
	$result = mysql_fetch_array(mysql_query("SELECT texte_english FROM teen_quotes_quotes where id = '".$id_quote."' AND approved = '1'"));
	$texte = $result['texte_english'];
	echo '<title>Teen Quotes | Quote #'.$id_quote.'</title>';
	echo '<meta name="description" content="'.$texte.'"/>';
	}
elseif (isset($_GET['letter']) OR $php_self == "members") 
	{
	$lettre = mysql_real_escape_string($_GET['letter']);
	if (empty($lettre)) { $lettre = "A"; }
	$php_self = 'members-'.$lettre.'';
	echo '<title>Teen Quotes | Members - '.$lettre.'</title>';
	echo '<meta name="description" content="Teen Quotes : because our lives are filled full of beautiful sentences, and because some quotes are simply true. Your every day life moments."/>';
	}
elseif ($php_self == 'apps')
	{
	include 'lang/'.$language.'/apps.php';
	echo '<title>Teen Quotes | '.$applications.'</title>';
	echo "\r\n";
	echo '<meta name="description" content="Teen Quotes : download our application for iOS and Android."/>';
	}
else 
	{
	echo '<title>Teen Quotes | Because some quotes are simply true</title>';
	echo "\r\n";
	echo '<meta name="description" content="Teen Quotes : because our lives are filled full of beautiful sentences, and because some quotes are simply true. Your every day life moments."/>';
	}
?>		
		<meta name="keywords" content="'Teen Quotes', 'teenage quotes', 'teenager quotes', 'quotes for teenagers', 'teen qoutes', 'quotes', 'teen', 'citations', 'sentences', 'Augusti', 'Twitter', 'Facebook'"/> 
		<meta name="author" content="Antoine Augusti"/> 
		<meta name="revisit-after" content="2 days"/> 
		<meta name="date-creation-ddmmyyyy" content="2609010"/> 
		<meta name="Robots" content="all"/> 
		<meta name="Rating" content="General"/> 
		<meta name="location" content="France, FRANCE"/> 
		<meta name="expires" content="never"/> 
		<meta name="Distribution" content="Global"/> 
		<meta name="Audience" content="General"/>
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;"/>
		<meta http-equiv="Content-Language" content="en,fr" /> 
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<link type="text/css" rel="stylesheet" media="screen" href="http://m.teen-quotes.com/style.css" /> 
		<!--[if IE]><style>.submit:hover{color:#000!important}</style><![endif]--> 
		<link rel="shortcut icon" type="image/x-icon" href="http://teen-quotes.com/images/favicon.gif" /> 
		<link rel="image_src" href="http://<?php echo $domaine; ?>/images/icon50.png" /> 
		<meta property="og:image" content="http://<?php echo $domaine; ?>/images/icon50.png" />
		
		<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-12045924-10']);
		_gaq.push(['_setDomainName', 'teen-quotes.com']);
		_gaq.push(['_setAllowHash', 'false']);
		_gaq.push(['_setSiteSpeedSampleRate', 100]);
		_gaq.push(['_trackPageview']);
		
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
</head>
<body>
<div id="topbar">
	<a href="../"><img src="http://teen-quotes.com/images/logo.png" style="height:50px" /></a>
	<span class="right" style="margin-top:20px">
		<a href="http://teen-quotes.com" title="View the english version"><span class="icone_flags english"></span></a>
		<a href="http://kotado.fr" title="Voir la version française"><span class="icone_flags french"></span></a>
	</span> 
</div>
</div><!-- END TOPBAR -->


<div id="content">

<div id="wrapper"><!-- START WRAPPER -->
	<ul class="menu">
	<?php if ($_SESSION['logged'] != TRUE) { ?>
		<li><a href="/"><?php echo $home; ?></a></li>
		<li><a href="signup?topbar"><?php echo $sign_up; ?></a></li>
		<li><a href="signin"><?php echo $sign_in; ?></a></li>
		<li><a href="random"><?php echo $random_quote_m; ?></a></li>
		<li><a href="searchform"><?php echo $search; ?></a></li>
		<li><a href="newsletter">Newsletter</a></li>
		<li><a href="signup?addquote"><?php echo $add_a_quote; ?></a></li>
			<?php } else { ?>
		<li><a href="/"><?php echo $home; ?></a></li>
		<li><a href="user-<?php echo $id; ?>"><?php echo $my_profile; ?></a></li>
		<li><a href="random"><?php echo $random_quote_m; ?></a></li>
		<li><a href="searchform"><?php echo $search; ?></a></li>
		<?php if($is_newsletter=="0") { ?><li><a href="newsletter">Newsletter</a></li><?php } ?>
		<li><a href="addquote"><?php echo $add_a_quote; ?></a></li>
		<li><a href="?deconnexion" title="<?php echo $log_out; ?>"><?php echo $logout; ?></a></li>
		<?php if($_SESSION['security_level'] >='2') { ?><li><a href="admin">Admin <?php if ($citations_awaiting_approval > '0'){echo '- '.$citations_awaiting_approval.'';} ?></a></li><?php } ?>
		<?php }	?>
	</ul>

<div class="clear" style="height:10px"></div>

<?php
if ($download_app == TRUE OR $_SESSION['security_level'] > '0')
	{
	if (((mb_eregi('ipod',$user_agent) OR mb_eregi('iphone',$user_agent)) AND $link_app_iphone != '#' AND $_SESSION['hide_download_app'] != TRUE) OR ((mb_eregi('ipod',$user_agent) OR mb_eregi('iphone',$user_agent)) AND $_SESSION['security_level'] > '0' AND $_SESSION['hide_download_app'] != TRUE))
		{
		echo ''.$download_iphone_app.'';
		}
	elseif ((mb_eregi('android',$user_agent) AND $link_app_android != '#' AND $_SESSION['hide_download_app'] != TRUE) OR (mb_eregi('android',$user_agent) AND $_SESSION['security_level'] > '0' AND $_SESSION['hide_download_app'] != TRUE))
		{
		echo ''.$download_android_app.'';
		}
	}
?>