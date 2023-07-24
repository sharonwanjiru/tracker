#!/usr/bin/php
<?php
//
//Resolve the performance
include_once './performance.php';
//
//Create a new performance.
$performance = new performance();
//
//Execute the poll invoices.
$performance->execute();
//
//Log a successful entry at this time.(Get the script name and time and echo)
