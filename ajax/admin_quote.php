<?php
session_start();
header("Access-Control-Allow-Origin: *");
require "../kernel/config.php";
if ($domaine == "kotado.fr")
	{
	$language = "french";
	}
else
	{
	$language = "english";
	}
include '../lang/'.$language.'/admin.php';
$db = mysql_connect($host, $user, $pass)  or die('Erreur de connexion '.mysql_error());
mysql_select_db($user,$db)  or die('Erreur de selection '.mysql_error()); 
require "../kernel/fonctions.php";

$approve = mysql_real_escape_string($_POST['approve']);
$id_quote = mysql_real_escape_string($_POST['id_quote']);
$auteur_id = mysql_real_escape_string($_POST['id_user']);

if (preg_match('/'.$domaine_fr.'/', $_SERVER['SERVER_NAME']) OR preg_match('/'.$domaine_en.'/', $_SERVER['SERVER_NAME']) AND $_SESSION['security_level'] >= 2) 
	{
	if ($approve == "yes") 
		{
		$approve_quote = mysql_query("UPDATE teen_quotes_quotes SET approved = '2' WHERE id = '".$id_quote."'");
		
		$query_texte_quote = mysql_fetch_array(mysql_query("SELECT q.texte_english texte_english, q.date date, a.username username, a.email email FROM teen_quotes_quotes q, teen_quotes_account a WHERE q.auteur_id = a.id AND q.id = '".$id_quote."'"));
		$texte_quote = $query_texte_quote['texte_english'];
		$date_quote = $query_texte_quote['date'];
		$email_auteur = $query_texte_quote['email'];
		$name_auteur = $query_texte_quote['username'];
		
		$nb_quote_awaiting_post = mysql_num_rows(mysql_query("SELECT id FROM teen_quotes_quotes WHERE approved = '2'"));
		$jours_posted = floor($nb_quote_awaiting_post / $nb_quote_released_per_day);
		if ($nb_quote_awaiting_post % $nb_quote_released_per_day != '0')
			{
			$jours_posted = $jours_posted + 1;
			}
		if ($jours_posted > '1')
			{
			$days_quote_posted = $days_quote_posted.'s';
			}
			
		$date = date("d/m/Y", strtotime('+'.$jours_posted.' days'));
		
		if ($language == "french")
			{
			$message = ''.$top_mail.' Bonjour <font color="#5C9FC0"><b>'.$name_auteur.'</b></font> !<br><br />Votre citation a �t� <font color="#5C9FC0"><b>approuv�e</b></font> r�cemment par un membre de notre �quipe. Elle sera publi�e le <b>'.$date.'</b> ('.$jours_posted.' '.$days_quote_posted.'), vous recevrez un email quand elle sera publi�e sur le site.<br><br />Voici votre citation :<br><div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:10px;margin:30px 10px">'.$texte_quote.'<br><br /><a href="http://www.kotado.fr" target="_blank">#'.$id_quote.'</a><span style="float:right">par <a href="http://www.kotado.fr/user-'.$auteur_id.'" target="_blank">'.$name_auteur.'</a> le '.$date_quote.'</span></div>Cordialement,<br><b>L\'�quipe de Kotado</b>'.$end_mail.'';
			}
		else
			{
			$message = ''.$top_mail.' Hello <font color="#5C9FC0"><b>'.$name_auteur.'</b></font> !<br><br />Your quote has been <font color="#5C9FC0"><b>approuved</b></font> recently by a member of our team. It will be released on <b>'.$date.'</b> ('.$jours_posted.' '.$days_quote_posted .'), you will receive an email when it will be posted on the website.<br><br />Here is your quote :<br><div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:10px;margin:30px 10px">'.$texte_quote.'<br><br /><a href="http://www.teen-quotes.com" target="_blank">#'.$id_quote.'</a><span style="float:right">by <a href="http://www.teen-quotes.com/user-'.$auteur_id.'" target="_blank">'.$name_auteur.'</a> on '.$date_quote.'</span></div>Sincerely,<br><b>The Teen Quotes Team</b>'.$end_mail.'';
			}
		
		if ($approve_quote) 
			{
			$mail = mail($email_auteur, $quote_added_queue, $message, $headers); 
			echo ''.$succes.' The quote has been added to the queue. The author will be notified';
			}
		}
	else
		{
		$delete_quote = mysql_query("UPDATE teen_quotes_quotes SET approved = '-1' WHERE id = '".$id_quote."'");

		$query_texte_quote = mysql_fetch_array(mysql_query("SELECT q.texte_english texte_english, q.date date, a.username username, a.email email FROM teen_quotes_quotes q, teen_quotes_account a WHERE q.auteur_id = a.id AND q.id = '".$id_quote."'"));
		$texte_quote = $query_texte_quote['texte_english'];
		$date_quote = $query_texte_quote['date'];
		$email_auteur = $query_texte_quote['email'];
		$name_auteur = $query_texte_quote['username'];
		
		if ($delete_quote AND !empty($email_auteur)) 
			{
			if ($language == "french")
				{
				$message = ''.$top_mail.'Bonjour <font color="#5C9FC0"><b>'.$name_auteur.'</b></font> !<br><br />Votre citation a �t� <font color="#5C9FC0"><b>rejet�e</b></font> r�cemment par un membre de notre �quipe...<br><div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:10px;margin:30px 10px">'.$texte_quote.'<br><br /><a href="http://kotado.fr" target="_blank">#'.$id_quote.'</a><span style="float:right">par <a href="http://kotado.fr/user-'.$auteur_id.'" target="_blank">'.$name_auteur.'</a> le '.$date_quote.'</span></div>Cordialement,<br><b>The Kotado Team</b>'.$end_mail.'';
				}
			else
				{
				$message = ''.$top_mail.' Hello <font color="#5C9FC0"><b>'.$name_auteur.'</b></font> !<br><br />Your quote has been <font color="#5C9FC0"><b>rejected</b></font> recently by a member of our team...<br><div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:10px;margin:30px 10px">'.$texte_quote.'<br><br /><a href="http://teen-quotes.com" target="_blank">#'.$id_quote.'</a><span style="float:right">by <a href="http://teen-quotes.com/user-'.$auteur_id.'" target="_blank">'.$name_auteur.'</a> on '.$date_quote.'</span></div>Sincerely,<br><b>The Teen Quotes Team</b>'.$end_mail.'';
				}
			$mail = mail($email_auteur, $quote_rejected, $message, $headers);
			echo ''.$succes.' The author has been notified successfully';
			}
		}
	}		
?>