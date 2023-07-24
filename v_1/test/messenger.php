<?php
//
//Resolve the reference to the database
require_once "./schema.php";
//
//Resolve the reference to the twilio class
require_once "./twilio.php";
//
//Send an sms to a user(s) of a business.
class messenger {
    //
    //The database to get the required data
    private $dbase;
    //
    //Collect all error if any to provide feedback to a user.
    private $errors=[];
    //
    //Create a new instance of the twilio class.
    function __construct() {
        //
        //Connect to the database.
        $this->dbase=new database("mutall_users");
        //
        //call twilio class.
        $this->twilio = new twilio();
    }
    //
    //Send an sms to the recipient who is either:-
    //- a group (where we send to all the members of the business).
    //- an individual (where we send to the selected user of the business.)
    private function send_sms(stdClass $recipient, string $subject, string $body)
    {
        //
        //If recipient is type group, send an sms to the members of the business.
        if ($recipient->type == "group")
            $this->send_group_messages($recipient->business, $subject, $body);
        //
        //If recipient is type individual, send an sms to the selected user.
        else
            $this->send_individual_message($recipient->user, $subject, $body);
    }
    //
    //If recipient is type group, send an sms to the members of the business.
    private function send_group_messages(stdClass $business, string $subject,string $body) {
        //
        // Formulate the query to retrieve the valid phone numbers for users
        //of the current business.
        $sql = "
            with
            mobile as(
                select
                    distinct
                    mobile.num as num
                from mobile
                    inner join user on mobile.user= user.user
                    inner join member on member.user= user.user 
                    inner join business on business.business = member.business
        
                where 
                    business.id= 'business->id'
            )
            select * from mobile
        ";
        //
        // Get the member's phone numbers from the above query.
        $members = $this->dbase->get_sql_data($sql);
        //
        // Send a sms to each user.
        foreach($members as $member){
            //
            //Get the phone number.
            $number = $member->num;
            //
            //Send the sms.
            $sms_send = $this->twilio($number, $subject,$body);
            //
            //Ensure that the sms was sent.
            if($sms_send != 'ok') array_push($this->errors, "he sms to $number was not sent");
        }
    }
    //
    //If recipient is type individual, send an sms to the selected user.
    private function send_individual_message(stdClass $user, string $subject, string $body) {
        //
        //
        foreach($user as $user_name){
            //Formulate the sql to get the phone number of the selected user.
            $sql = "
                select 
                    distinct
                    mobile.num,
                    user.name
                from 
                    mobile
                    inner join user on mobile.user = user.user
                where
                    user.name = '$user_name';
            " ;
            //
            // Get the phone number from the database as an array.
            $numbers = $this->dbase->get_sql_data($sql);
            //
            // Check if the phone number (array) is available or empty. If empty end the process
            if($numbers < 1) array_push($this->errors, "There is no available phone number for $user_name.");
            //
            // otherwise get the phone number.
            $number = $numbers[0]['num'];
            //
            // Send a sms to the user.
            $sms_send = $this->twilio($number, $subject, $body);
            //
            //Ensure the sms was sent.
            if($sms_send != 'ok') array_push($this_errors, "The sms for $user_name was not sent to $number.");
        }
    }
    //
    //This function sends sms's to members of the named business and
    //returns an array of errors if any.
    public function send(stdClass $recipient, string $subject, string $body):array {   
        //
        // Send the phone messages.
        $this->send_sms($recipient, $subject, $body);
        //
        //Return the errors if any.
        return $this->errors;
    }
}
