#!usr/bin/php
<?php
use migration;
//
//Resolve access to the shared migration class
include_once 'migration.php';

//Create a migration class
$migration = new migration($dbname);
//
//Execute the migration processs
$migration.execute();