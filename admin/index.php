<?php
    require 'functions.php';
?>
<!DOCTYPE html>
<html lang="en">
	<head>
        <meta charset="utf-8">
        <title>- Sensus -</title>
        <!-- Bootstrap -->
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        <link href="css/styles.css" rel="stylesheet">
    </head>
    <body>
        <div id="fb-root"></div>
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#users">Mi Estilo de Hoy</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav nav-menu">
                        <li class="active" menu="image"><a href="#">Submenu</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <img class="navbar-brand login loader" src="img/ajax-loader.gif">
                        <div class="navbar-brand login nombre"></div>
                        <div class="navbar-form login fblogin">
                            <button class="btn btn-default login fblogin">Login</button>
                        </div>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </div>
        <div class="container" id="content">
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

    <?php if($config['Facebook']['liked']): ?>
    	<script src="lib/jquery-1.7.2.min.js"></script>
	    <script src="lib/underscore-min.js"></script>
	    <script src="lib/backbone-min.js"></script>
	    <script src="lib/backbone.routerFilters.js"></script>
	    <script src="lib/async.js"></script>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bootstrap/js/bootstrap.min.js"></script>

	    <script src="js/models/sessionmodel.js"></script>
        <script src="js/models/usersmodel.js"></script>

	    <script src="js/utils.js"></script>
	    <script src="js/views/home.js"></script>
        <script src="js/views/users.js"></script>

	    <script src="js/main.js"></script>
	<?php endif; ?>
</html>