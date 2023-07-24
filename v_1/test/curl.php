<?php
//
//
//Initialize the resource.
$ch = curl_init();
//
//Set the parameters.
curl_setopt_array(
$ch, array(
// CURLOPT_URL => 'https://mutall.co.ke/mutall_rental/track_invoices/track_invoices.php',
CURLOPT_URL => 'https://mutall.co.ke/migration/extract.php',
//
//
CURLOPT_RETURNTRANSFER => true
));
//
//Execute the above.
$response = curl_exec($ch);
echo $response;