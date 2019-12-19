<?php
session_start();
$retour=$_POST['retour'];
$reconnexion = $_SESSION['reconnexion'];
if(isset($retour)) {$_SESSION['mdp']='d3d3_2014';} else {$_SESSION['mdp']=$_POST['mdp'];}
$session = $_SESSION['mdp'];

include $_SERVER['DOCUMENT_ROOT'].'/bdd/admin/bd.inc.php';
$requete = 'select COUNT(*) as nb FROM image';
$where_archive = ' WHERE TRUE AND categorie LIKE "archive" AND web_ok=1 and img_ok=1';
$where_photo = ' WHERE TRUE AND (categorie LIKE "photographie" OR categorie LIKE "orthoimage GPP")';

$nb_archives = mysqli_query($acces_bdd, $requete . $where_archive);
$donnees = mysqli_fetch_array($nb_archives);
$nb_arch = $donnees['nb'];

$nb_photos = mysqli_query($acces_bdd, $requete . $where_photo);
$donnees = mysqli_fetch_array($nb_photos);
$nb_phot_fiches = $donnees['nb'];
$nb_phot_sg = 1773; // maj juillet 2018
$nb_phot_vdp = 570+125; // maj juillet 2018
$nb_phot = $nb_phot_fiches + $nb_phot_sg + $nb_phot_vdp;
?>

<!doctype html>
<html lang="fr">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="<?php $_SERVER['DOCUMENT_ROOT']; ?>/bdd/admin/style/style.css"/>
	<link rel="icon" type="image/png" href="<?php $_SERVER['DOCUMENT_ROOT']; ?>/bdd/admin/style/favicon.png" />
	<title>BDD Villa Diomedes Project</title>
	
	<!-- Piwik -->
	<script type="text/javascript">
  		var _paq = _paq || [];
  		_paq.push(['trackPageView']);
  		_paq.push(['enableLinkTracking']);
  		(function() {
    		var u="//transfers.huma-num.fr/annexes/piwik/";
    		_paq.push(['setTrackerUrl', u+'piwik.php']);
    		_paq.push(['setSiteId', 2]);
    		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    		g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  		})();
	</script>
	<noscript><p><img src="//transfers.huma-num.fr/annexes/piwik/piwik.php?idsite=2" style="border:0;" alt="" /></p></noscript>
	<!-- End Piwik Code -->
</head>

<body>
	<?php include $_SERVER['DOCUMENT_ROOT'].'/bdd/admin/header.html.php';?>
	<div id="global2">
		<h3>Villa Diomedes Project</h3>
		<h4>&nbsp;Bases de données de recherche</h4>

		<?php if ($session!="d3d3_2014") { 
			/* Accueil avant saisie du code */?>
			<br/><p><i>Site provisoirement en accès restreint.</i><br/>Veuillez entrer le mot de passe pour pouvoir entrer :<br><br></p>
			<form action="" method="post">
				<input type="password" name="mdp" class="champ"/>
				<input type="hidden" name="entrer"/>
				<input type="submit" value="VALIDER" class="Valider L_160">
			</form>
			<br><br>
			<?php if(isset($session) and $_SESSION['mdp']!='d3d3_2014') {
				echo '<span style="font-size:small;font-style: italic;">Mot de passe erroné : veuillez recommencer</span>';
			}?>
			<br/>
		
		<?php } else if ($reconnexion=='images') {
			/* Accueil après saisie du code */
			$_SESSION['reconnexion']='';
			header('Location: /bdd/images/');
		} else if ($reconnexion=='espaces') {
			$_SESSION['reconnexion']='';
			header('Location: /bdd/espaces/');
		} else { ?>
			<br/>
			<form action="images/" method="post">
				<input type="submit" class="lien" value="Base de données IMAGES">
			</form>
			<div class="presbdd">Photographies de terrain (<?php echo $nb_phot;?>) et documents d'archives (<?php echo $nb_arch;?>)</div>
			<br/>
			<form action="espaces/" method="post">
				<input type="submit" class="lien" value="Base de données ESPACES">
			</form>
			<div class="presbdd">Numérotation des espaces de la villa selon 10 plans de référence</div>
			<div class="maj">Dernière mise à jour : 26 juillet 2018</div>     
		<?php }?>

	</div>

	<?php include './admin/footer.html.php';?>
</body>
</html>