<?php
require 'vendor/autoload.php';
require 'config.php';

date_default_timezone_set("America/Santiago");
header('P3P: CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');

$app = new \Slim\Slim();

require 'session.php';

/* Configuración de Session */
$app->add(new \Slim\Middleware\SessionCookie($session));

/* Configuración de app */
$app->config($config);

/* Setup Facebook. */
$facebook = new Facebook(array(
    "appId"  => $app->config("Facebook")['appId'],
    "secret" => $app->config("Facebook")['apiKey']
));

$app->configureMode('production', function() use ($app, $connections) {
	$app->config(array(
        'log.enable' => true,
        'debug' => false
    ));

	ActiveRecord\Config::initialize(function($cfg) use ($connections) {
	    $cfg->set_model_directory("models");
	    $cfg->set_connections($connections);
	    
	    # Default connection is now development
	    $cfg->set_default_connection("production");
	});
});

$app->configureMode('development', function() use ($app, $connections) {
	$app->config(array(
        'log.enable' => false,
        'debug' => true
    ));
    
	ActiveRecord\Config::initialize(function($cfg) use ($connections) {
	    $cfg->set_model_directory("models");
	    $cfg->set_connections($connections);
	    
	    # Default connection is now development
	    $cfg->set_default_connection("development");
	});
});

$app->hook("slim.before", function() use ($app, $facebook) {
  
    /* IE has problems with crossdomain cookies. */
    //header('P3P: CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');

    /* When using FB.login(...) or already installed. */
    if(isset($_REQUEST["signed_request"])) {
        $signed_request = $facebook->getSignedRequest();
        if (isset($signed_request["oauth_token"])) {

            /* Save access token to session since not all  */
            /* requests come from Facebook iframe. */        
            $_SESSION["access_token"] = $signed_request["oauth_token"];
        } else {
            unset($_SESSION["access_token"]);
        }
    }

    /* Set the access token if we have any. */
    if (isset($_SESSION["access_token"])) {
        $facebook->setAccessToken($_SESSION["access_token"]);
    }
    
});

/* Verifica rol del usuario */

function authorize($role = "user") {
    return function () use ($role) {
        // Get the Slim framework object
        $app = \Slim\Slim::getInstance();

        try {
        	$user = User::find($app->getEncryptedCookie('uid'));

        	if (!empty($user)) {
        		if ($role == "admin") {
        			if (!$user->is_admin) {
        				$app->halt(403, 'You shall not pass!');
        			}
        		}
        	} else {
        		$app->halt(401, 'You shall not pass!');
        	}

        } catch (Exception $e) {
			$app->halt(401, 'You shall not pass!');
		}

    };
}

/* Login */

$app->post('/login', function() use ($app, $facebook) {
	try {
		$uid = $facebook->getUser();

		$user = User::find_by_facebook_id($uid);

		if (!empty($user)) {
			$app->setEncryptedCookie('uid', $user->id, '60 minutes');

			$user->oauth_token = $facebook->getAccessToken();
			$user->save();

			$app->response()->header('Content-Type', 'application/json');

			$response = array();
			$response['user'] = $user->to_array();
			$response['isAdmin'] = $user->is_admin;

			echo json_encode($response);

			$app->response()->status(202);
		} else {
			try {
				$data = $facebook->api("/me");

				$user = new User();
				$user->username = (isset($data['username'])) ? $data['username'] : null;
				$user->facebook_id = $data['id'];
				$user->oauth_token = $facebook->getAccessToken();
				$user->name = $data['name'];
				$user->mail = $data['email'];
				$user->first_name = $data['first_name'];
				$user->last_name = $data['last_name'];
				$user->link = $data['link'];
				$user->gender = $data['gender'];
				$user->birthday = (isset($data['birthday'])) ? $data['birthday'] : null;
				$user->location = (isset($data['location']['name'])) ? $data['location']['name'] : null;
				$user->save();

				$app->setEncryptedCookie('uid', $user->id, '60 minutes');

				$app->response()->header('Content-Type', 'application/json');

				$response = array();
				$response['user'] = $user->to_array();
				$response['isAdmin'] = $user->is_admin;

				echo json_encode($response);

				$app->response()->status(201);

			} catch (FacebookApiException $e) {
				$app->response()->status(401);
				$app->response()->header('X-Status-Reason', $e->getMessage());
			} catch (Exception $e) {
				$app->response()->status(400);
				$app->response()->header('X-Status-Reason', $e->getMessage());
			}
		}

	} catch (Exception $e) {
		$app->response()->status(400);
		$app->response()->header('X-Status-Reason', $e->getMessage());
	}
});

/* Logout */

$app->post('/logout', function() use ($app) {
	$app->deleteCookie('uid');
	$app->response()->status(202);
	$app->response()->header('X-Status-Reason', 'Logout');
});



$app->run();
