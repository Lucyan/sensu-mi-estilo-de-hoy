<?php
/**
 * This file houses the MpmInitialSchema class.
 *
 * This file may be deleted if you do not wish to use the build command or build on init features.
 *
 * @package    mysql_php_migrations
 * @subpackage Classes
 * @license    http://www.opensource.org/licenses/bsd-license.php  The New BSD License
 * @link       http://code.google.com/p/mysql-php-migrations/
 */

/**
 * The MpmInitialSchema class is used to build an initial database structure.
 *
 * @package    mysql_php_migrations
 * @subpackage Classes
 */
class MpmInitialSchema extends MpmSchema
{

	public function __construct()
	{
		parent::__construct();

		/* If you build your initial schema having already executed a number of migrations,
		* you should set the initial migration timestamp.
		*
		* The initial migration timestamp will be set to active and this migration and all
		* previous will be ignored when the build command is used.
		*
		* EX:
		*
		* $this->initialMigrationTimestamp = '2009-08-01 15:23:44';
		*/
		$this->initialMigrationTimestamp = null;
	}

	public function build()
 	{
		/* Add the queries needed to build the initial structure of your database.
		*
		* EX:
		*
		* $this->dbObj->exec('CREATE TABLE `testing` ( `id` INT(11) AUTO_INCREMENT NOT NULL, `vals` INT(11) NOT NULL, PRIMARY KEY ( `id` ))');
		*/

		$this->dbObj->exec('CREATE TABLE users (
		  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  username VARCHAR(255),
		  is_admin BOOL DEFAULT 0,
		  facebook_id VARCHAR(255),
		  oauth_token VARCHAR(255),
		  name VARCHAR(255),
		  mail VARCHAR(255),
		  first_name VARCHAR(255),
		  last_name VARCHAR(255),
		  link VARCHAR(255),
		  gender VARCHAR(255),
		  birthday VARCHAR(255),
		  location VARCHAR(255),
		  created_at DATETIME,
		  updated_at DATETIME
		)');
	}

}

?>