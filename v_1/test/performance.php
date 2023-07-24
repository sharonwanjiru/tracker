<!--#!/usr/bin/php-->
<?php
//
//REsolve the reference to the schema.
include_once '../../../schema/v/code/schema.php';
//
//Resolve the reference to the messenger.
include_once '../../../schema/v/code/messenger.php';
//
//Create a class fro monitering invoices performance.
class performance extends messenger{
    //
    //The consturctor.
    function __construct() {}
    //
    //Get the results on the posting of invoices from mutallco.
    function execute():void {
        //
        //Get the results from the mutall.co.ke server.
        //The result is either 0, 1 or an error message.
        $result/*'0'|'1'| msg*/ = get_tracking_result();
        //
        //If the result is 0 it means the posting hasnt been done,
        //so stop this process.
        if($result == '0') return;
        //
        //if the result is 1 the invoices have been send so inform the manager
        //through a message.
        if($result == "1") {
            //
            //Send the message to pm(using our messenger library).
            $errors = $this->send_message();
            //
            //REport through the messaging system.
            $this->report_errors($errors);
        }
        // 
        //if the result is an error message we report the error.
        else {
            //
            //Report the error through the messaging system.
            $this->report_errors([$result]);
        }
    }
    //
    // Get the poll results.(use curl)
    // Interrogate the co server (through the curl library) to find out if the invoices 
    // have been issued for this month.
    function get_tracking_result() {
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
    function send_message(): array /*<error>*/{
        //
        //Get the recipient. The structure of the an individual 
        //is { type: 'individual', user: Array<string> }.
        //The array is an list of the addresses.
        //
        //Create a new stdclass.
        $receiver = new stdClass();
        //
        //Set the type key to the individual.
        $receiver->type = "individual";
        //
        //There is only one user pm.set his user name.
        $receiver->user = ["Peter K. Muraya"];
        //
        //Get the subject of the message.(Performance monitering)
        $subject/*:string*/ = "Performance monitering";
        //
        //Get the body of the message.(The invoices have been posted)
        $body/*:string*/ = "The invoices have been posted";
        //
        //Send the message now.
        //
        //Send the message.
        $errors/*Array<error>*/ = $this->send($receiver,$subject,$body);
        //
        //Retur n the errors
        return $errors;
    }
}