<?php
	header('Content-Type: text/html; charset=UTF-8');
	header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
	header('Pragma: no-cache');
    header('P3P: CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');

	require '../API/config.php';

	function beforeFilter() {
		global $config;

		if ($config['mode'] != 'development') {
			require_once 'phpLib/Mobile_Detect.php';
			$detect = new Mobile_Detect;

			if (!$detect->isMobile()) {
				session_start();

				if (empty($_SESSION)) {
					if (isset($_GET['start_session'])) {
						$_SESSION['start_session'] = true;
					} else {
						die('<script type="text/javascript">parent.location.href="'.URL_SITE.'?start_session=true";</script>');
					}
				}
				
				if(!isset($_REQUEST["signed_request"])) {
					die('<script type="text/javascript">parent.location.href="'.$config['Facebook']['appUrl'].'";</script>');
				} else {
					$signed_request = parse_signed_request($_REQUEST["signed_request"]);
					if (isset($signed_request['page'])) {
						$config['Facebook']['liked'] = (isset($signed_request['page']['liked'])) ? $signed_request['page']['liked'] : false;
					} else {
						die('<script type="text/javascript">parent.location.href="'.$config['Facebook']['appUrl'].'";</script>');
					}
				}
			} else {
				die('<script type="text/javascript">parent.location.href="' . URL_SITE . $config['movil'] . '";</script>');
			}
		}
	}

	function parse_signed_request($signed_request) {
		global $facebookConfig;
		list($encoded_sig, $payload) = explode('.', $signed_request, 2); 

		// decode the data
		$sig = base64_url_decode($encoded_sig);
		$data = json_decode(base64_url_decode($payload), true);

		// confirm the signature
		$expected_sig = hash_hmac('sha256', $payload, $facebookConfig['secret'], $raw = true);
		if ($sig !== $expected_sig) {
			error_log('Bad Signed JSON signature!');
			return null;
		}

		return $data;
	}

	function base64_url_decode($input) {
		return base64_decode(strtr($input, '-_', '+/'));
	}
	
	function getFacebook(){
		global $config;
		return $config['Facebook'];
	}

	function getGA(){
		$GAConfig = array(
			'id' => '',
			'domain' => ''
		);
		return $GAConfig;
	}

	function defineSiteURL(){
		$path = str_replace($_SERVER['DOCUMENT_ROOT'], '', __DIR__);
		$protocol = isset($_SERVER['HTTPS'])?'https://':'http://';
		$url = $protocol.$_SERVER['HTTP_HOST'].$path.'/';
		define("URL_SITE",$url);
	}

	$facebookConfig = getFacebook();
	defineSiteURL();
	$facebookConfig['apiUrl'] = str_replace('admin/', '', URL_SITE) . $facebookConfig['apiDir'];

	//beforeFilter();

	class PHPStats{
	    static $time_start     =   0;
	    static $time_end       =   0;
	    static $time           =   0;
	    static function start(){
	        self::$time_start= microtime(true);
	    }
	    static function end(){
	        self::$time_end = microtime(true);
	        self::$time = self::$time_end - self::$time_start;
	        echo "<!--\n"; 
			echo "Execution Time: " . self::$time . " seconds\n";
			echo "Memory Usage: " . ( memory_get_usage() / 1024 ) . "\n";
			echo "Memory Peak: " . ( memory_get_peak_usage() / 1024 ) . "\n";
			echo '-->';
	    }
	}

?>