<?php
//
//Resolve the reference to the twilio class
require_once "../twilio/twilio.php";
//
//Resolve the reference to the mailer class
require_once "../mailer/mailer.php";
//
//Resolve the reference to the database
require_once "./schema.php";
//
//This is the messenger class that focuses on sending emails and SMS's to 
//multiple users by retrieving the user's email and the user's phone_number from
//the database and sending a message for each user.
class messenger
{
    //
    //The twilio class
    private $twilio;
    //
    //The mailer class
    private $mailer;
    //
    //The database class that supports querying the database
    private $dbase;
    //
    //The error handling mechanism for collecting errors reported when an email
    //and email is not sent or when an email does not fit the criteria for an 
    //email
    private $errors=[];
    //
    //Instantiate the twilio and mailer classes at this point
    function __construct()
    {
        //
        //Connect to the database
        $this->dbase=new database("mutall_users");
        //
        //Open the twilio class
        $this->twilio = new twilio();
        //
        //Open the mailer class
        $this->mailer = new mailer();
    }
    //
    //Send individual email
    private function send_email(stdClass $recipient, string $subject, string $body){
        //
        //Send the group email from the recipients
        if($recipient->type== "group")
            $this->send_group_emails ($recipient->business, $subject, $body);
        //
        //Send to individual messages
        $this->send_individual_emails($recipient->address,$subject, $body)???;
    }
    //
    //Send emails to members of the named business and return errors if any
    private function send_group_emails( $business, string $subject, string $body):void{
        //
        //1. The query to fetch all emails for users registered under the current
        //business
        $sql="select"
                . "user.email "
            . "from user "
                . "inner join member on member.user=user.user"
                . "inner join business on business.business= member.business"
            . "where email is not null ??and business.business= $pk";???
        //
        //2. Get the recievers of the emails
        $recievers= $this->dbase->get_sql_data($sql);
        //
        //3. For every email address provided, validate the emails addresses
        //before sending the actual emails
        foreach($recievers as $reciever){
            //
            //The email address of the reciever
            $email= $reciever->email;
            //
            //Validate the email to prevent sending an email to the wrong user
            $match=preg_match('/^\w+|\S+\w+\@\w+\.\w+|\S+/',$email);
            //
            //If something is wrong with the pattern, stop the process
            if($match === false){throw new Exception("Something is wrong with the"
                    . "pattern.");
            }
            //
            //If the email is wrong, flag it as an error and skip this step
            if($match=== 0){
                //
                //Add the error message to the error log
                array_push($this->errors,"This email '$email' is not correct");
                //
                //Skip the email
                break;
            }
            //
            //Send the email.
            $sent_email=$this->mailer($email,$subject,$body);
            //
            //If the email was not sent, flag it as an error
            if($sent_email!== "ok")array_push($this->errors, "An email was not sent to $email"); 
        }  
    }
    //
    //Sending phone messages to members of the named business returning an array
    //of errors if the sending of emails failed
    private function send_sms(int $business, string $subject,string $body){
        //
        //1. Construct the query to retrieve the valid phone numbers for users
        //of the current business.
        $query="with
            #
            #Get the primary phone number of each user
            mobile as(
                select
                    concat(mobile.prefix,mobile.num) as num,
                    row_number() over(partition by mobile.user) as users
                from mobile
                    inner join user on mobile.user= user.`user`
                    inner join member on member.user= user.user 
                    inner join business on business.business = member.business

                where 
                    business.business=$business 
            )
            #
            #Select all users with phone numbers linked to a business
            select * from mobile where users=1";
        //
        //2. Get the member's phone numbers
        $receivers=$this->dbase->get_sql_data($query);
        //
        //4. Send a message to each user.
        foreach($receivers as $receiver){
            //
            //4.1. Complete the phone number by adding the country code at the 
            //beginning of the number
            $phone=$receiver->num;
            //
            //4.2. Send the phone message
            $sent_sms=$this->twilio($phone,$subject,$body);
            //
            //4.3.If the sms is not sent, flag it as an error
            if($sent_sms!="ok")array_push($this->errors,"An sms was not sent to $phone"); 
        }
    }
    //
    //
    //This function sends emails and sms's to members of the named business and
    //returns an array of errors if any.
    // 
    public function send(stdClass $recipient, string $subject, string $body):array
    {   
        //
        //1. Send the emails
        $this->send_emails($recipient,$subject,$body);
        //
        //2. Send the phone messages
        $this->send_messages($recipient,$subject,$body);
        //
        //5. Return true or false once the mail and sms are sent
        return $this->errors;
    }
}
