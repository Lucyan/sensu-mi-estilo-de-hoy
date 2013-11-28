<?php

class Migration_2013_11_28_02_28_45 extends MpmMysqliMigration
{

	public function up(ExceptionalMysqli &$mysqli)
	{
		$mysqli->exec('CREATE TABLE estilos (
		  id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
		  user_id INTEGER,
		  estilo INTEGER,
		  numero INTEGER,
		  compartido BOOL DEFAULT 0,
		  created_at DATETIME,
		  updated_at DATETIME
		)');
	}

	public function down(ExceptionalMysqli &$mysqli)
	{
		
	}

}

?>