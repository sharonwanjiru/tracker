<?php
//This is the file to transmit the changes from CO to DO
//
use function mutall\ingest;

include_once './ingest.php';
//
//This the sql to executed on the CO to extract the data
$query = file_get_contents("payments.sql"); 
//
$sql = json_encode(["query" => $query]);
//
//Initialize a curl connection to Mutall co to execute the query
$curl = curl_init();
//
//Create multiple options for the cURL transfer
curl_setopt_array($curl, array(
    //
    //Set the mutall co extraction file
    CURLOPT_URL => 'https://mutall.co.ke/migration/index.php',
    //
    //Get some output from the request once it sent
    CURLOPT_RETURNTRANSFER => true,
    //
    //Set a POST custom request
    CURLOPT_CUSTOMREQUEST => 'POST',
    //
    //set the body of the request.
    CURLOPT_POSTFIELDS => $sql,
    //
    //Add the request headers
    CURLOPT_HTTPHEADER => array('Content-Type: application/plain')
    
));
//
//Execute the request.Hopefully the response are the changes that have taken place
$body = curl_exec($curl);
//
echo $body;
//
//Call francis's method to load kanga'ras response to the mutall rental
//daabase in this DO server
$result= ingest($body, $sql);
//
//Compile the result
echo $result;
