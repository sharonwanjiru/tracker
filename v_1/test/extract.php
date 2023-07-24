<?php
//1. Connect to the database.
$servername = "localhost";
$username = "mutallco";
$password = "mutall_techub";
$conn = new PDO("mysql:host=$servername;dbname=mutallco_rental", $username, $password);
//
//b. Get the result.
//
//1. Run the query
$results = $conn->query($sql);
// 
//2. Fetch the result.
$result = $results->fetch(PDO::FETCH_ASSOC);
//
echo ($result);
?>
