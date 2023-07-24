<?php
//
//Catch all errors, including warnings.
\set_error_handler(function($errno, $errstr, $errfile, $errline /*, $errcontext*/) {
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});
//
//The schema is the base of all our applications; it is primarily used for
//supporting the database class
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/schema.php';
//
//We want to have access to the selector class
include_once $_SERVER['DOCUMENT_ROOT'] . '/schema/v/code/sql.php';
//
// 1. Open the mutall rental database.
$dbase = new database('mutallco_rental', true, true);
// 
// 2. Get the sql data.
$sql = "select num from eaccount";
// 
// 3. Select eaccount.num from eaccount.
$eaccounts = $dbase->get_sql_data($sql);
// 
// 4. Map the result into an array
$values = array_map(fn($eaccount)=>$eaccount['num'], $eaccounts);
$x = new stdClass();

$x -> data = $values;

$x -> user = "Muraya";
//
// 5. Json encode and echo the array
echo json_encode($values);
