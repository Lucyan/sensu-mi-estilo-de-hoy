<?php
    require 'functions.php';
?>
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta charset="utf-8">
        <title>- Sensu -</title>
        <link href="css/reset.css" rel="stylesheet">
        <link href="fonts/stylesheet.css" rel="stylesheet">
        <link href="css/styles.css" rel="stylesheet">
    </head>
    <body>
        <div id="fb-root"></div>
    	<?php if($config['Facebook']['liked']): ?>
	    	<div id="content">
	    	</div>
	    <?php else: ?>
	    	<div id="nolike">
	    	</div>
		<?php endif; ?>
        <div id="footer">
            <a href="#premios">PREMIO</a>
            <img src="img/footer/separacion.png" />
            <a href="#ganadores">GANADORES</a>
            <img src="img/footer/separacion.png" />
            <a href="#">BASES</a>
            <img src="img/footer/separacion.png" />
            <a href="#">POLITICAS DE PRIVACIDAD</a>
        </div>
    </body>
    <script type="text/javascript">
        var fbconfig = {
            appId: '<?php echo $facebookConfig['appId']; ?>',
            channel: '<?php echo URL_SITE."channel.php"; ?>',
            permissions: '<?php echo $facebookConfig['permissions']; ?>',
            urlSite: '<?php echo URL_SITE; ?>',
            apiUrl: '<?php echo $facebookConfig['apiUrl']; ?>',
            channel: '<?php echo URL_SITE; ?>' + 'channel.php'
        };
    </script>
    
	<script src="lib/jquery.min.js"></script>
    <script src="lib/jquery.transit.min.js"></script>
    <script src="lib/underscore-min.js"></script>
    <script src="lib/backbone-min.js"></script>
    <script src="lib/backbone.routerFilters.js"></script>
    <script src="lib/async.js"></script>

    <script src="js/models/sessionmodel.js"></script>
    <script src="js/models/estilomodel.js"></script>

    <script src="js/utils.js"></script>

    <script src="js/views/home.js"></script>
    <script src="js/views/formulario.js"></script>
    <script src="js/views/ruleta.js"></script>
    <script src="js/views/miestilo.js"></script>
    <script src="js/views/felicidades.js"></script>
    <script src="js/views/premios.js"></script>
    <script src="js/views/ganadores.js"></script>

    <script src="js/ruleta.js"></script>

    <script src="js/main.js"></script>
</html>