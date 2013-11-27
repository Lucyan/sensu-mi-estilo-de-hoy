<?php

class Migration_2013_11_24_21_46_23 extends MpmMysqliMigration
{

	public function up(ExceptionalMysqli &$mysqli)
	{
		$mysqli->exec("ALTER TABLE `users` 
			ADD COLUMN `telefono` VARCHAR(100) NULL  AFTER `location` , 
			ADD COLUMN `celular` VARCHAR(100) NULL  AFTER `telefono` , 
			ADD COLUMN `comuna` VARCHAR(255) NULL  AFTER `celular` ;");
	}

	public function down(ExceptionalMysqli &$mysqli)
	{
		
	}

}

?>