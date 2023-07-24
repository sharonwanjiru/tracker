<?php
//
include_once '../../../schema/v/code/migration.php';
//
//1. Connect to the database.
$servername = "localhost";
$username = "root";
$password = "";
$pdo = new PDO("mysql:host=$servername;dbname=mutallco_rental", $username, $password);
//
//b. Get the result.
$sqls /*Array{tname:string, sql:string}*/ = json_decode($_POST["sqls"]);
//
$migration = new migration($dbname);
//
$result/*Array<ingester>*/ = $migration->extract($sqls, $pdo);
//
echo json_encode($result);