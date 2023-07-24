<?php
// 
require_once '../../../schema/v/twilio/vendor/autoload.php';
//
require_once "../../../schema/v/twilio/twilio.php";
// 
use Twilio\Rest\Client;
// 
$sid = "AC59f608749c260f84f95a31a6e0fd1fc7";
//
//Get the account AUTH_TOKEN
$token = "bfb025bd6f7b302c235831e0f3bdf9b7";
//
//Get the account PHONE_NUMBER
$phone = "+12182929241";
//
$to = '+254759380195';
//
//Get the body of the message
$body = 'Hey you!';
//
$twilio = new Client($sid, $token);
//
$message = $twilio->messages->create(
    //
    //The phone address to send the message to
    $to,
    [   //
        //The body of the message
        "body" => $body,
        //
        //The phone where the message is coming from
        "from" => $phone
    ]
);

