<?php
//
$localhost = '127.0.0.1';
$user = 'root';
$password = '';
$database = 'mutall_users';
//
$conn = new PDO("mysql:host=$localhost;dbname=$database", $user, $password);
//
//Set the PDO error mode to exception.
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);