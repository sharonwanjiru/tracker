<?php
//
include_once '../../../schema/v/code/schema.php';
//
// 1. Request for track_invoices service results from mutallco.
$result = get_tracking_result();
// 
// Create  a new messenger.
$msg = new messenger();
// 
// 2. The result is either 0, 1 or an error message. If its 0, we stop this process,
// if its 1 we send an email to pm , if its an error message we report the error.
if($result == '0') die();
//
if($result == "1") {
    //
    //Send the message to pm(using our messenger library).
   send_message();
}
// 
else {
    //
    //Report the error through the messaging system.
   $msg->report_error($result);
}
//
//Collect the errors.
// 
// Get the poll results.(use curl)
//Interrogate the co server (through the curl library) to find out if the invoices 
//have been issued for this month.
function get_tracking_result(){
    //
    $command = [ 
        //
        //Set the url to execute on the co server.
        CURLOPT_URL => 'https://mutall.co.ke/mutall_rental/track_invoices/track_invoices.php',
        //
        //Return what is echoed by the remote server to be the result of the
        //curl execution.
        CURLOPT_RETURNTRANSFER => true
    ];
    //
    //Initialize the resource.
    $ch = curl_init();
    //
    //Set the parameters(options).
    curl_setopt_array( $ch, $command);
    //
    //Execute the above.
    $output = curl_exec($ch);
    //
    //Return the result
    return $output;  
}
//
//Send the message to pm.
function send_message(){
    //
    //Get the recipient.(It is pm)
    //
    //Get the subject of the message.(Performance monitering)
    //
    //Get the body of the message.(The invoices have been posted)
    //
    //Send the message now.
    //
    //Send the message.
    $msg->send_sms();    
}
