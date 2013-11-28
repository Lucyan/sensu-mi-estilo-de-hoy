<?php

class Migration_2013_11_28_04_35_18 extends MpmMysqliMigration
{

	public function up(ExceptionalMysqli &$mysqli)
	{
		$mysqli->exec("ALTER TABLE `users` 
			ADD COLUMN `ganador` BOOL DEFAULT 0 AFTER `comuna`;");
	}

	public function down(ExceptionalMysqli &$mysqli)
	{
		
	}

}

?>