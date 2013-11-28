<?php

class Migration_2013_11_28_03_47_51 extends MpmMysqliMigration
{

	public function up(ExceptionalMysqli &$mysqli)
	{
		$mysqli->exec("ALTER TABLE `estilos` 
			ADD COLUMN `fb_ob_id` VARCHAR(200) NULL  AFTER `compartido` , 
			ADD COLUMN `fb_post_id` VARCHAR(200) NULL  AFTER `fb_ob_id`;");
	}

	public function down(ExceptionalMysqli &$mysqli)
	{
		
	}

}

?>