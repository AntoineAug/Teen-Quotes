<?php 
include 'header.php'; 
include "lang/$language/favorite.php"; 
$id_quote=mysql_real_escape_string($_GET['id_quote']);
if (empty($id_quote))
	{
	header("Location: error.php?erreur=403"); 
	}

$query=mysql_query("DELETE FROM teen_quotes_favorite WHERE id_quote='$id_quote' AND id_user='$id'");
$update_fav= mysql_query("UPDATE teen_quotes_quotes SET nb_fav=nb_fav-1 WHERE id='$id_quote'");
?>
<div class="post">
<h1><img src="http://<?php echo $domaine; ?>/images/icones/broken_heart.png" class="icone"><?php echo $unfavorite; ?></h1>
<?php
if($query) 
	{
	echo ''.$succes.' '.$delete_succes.'';
	echo '<meta http-equiv="refresh" content="3;url=quote-'.$id_quote.'" />';
	}
	else
	{
	echo '<h2>'.$error.'</h2>'.$lien_retour.'';
	}
	
echo '</div>';
include "footer.php"; ?>