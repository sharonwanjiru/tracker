<?php
//
//This is to be done on D.O through a cron job.
//
//2.1 Request for the invoice service from CO.???
$url = "https://206.189.207.206/email.txt";
//
//2.2 If the is no email exit this process otherwise.
if(!file_exists($url)) echo 'File does not exist.';
//
//2.3 Get the email.
$email = file_get_contents($url);
//
//2.4 Create a new emailer.
$mailer = new mailer();
//
//2.5 Send the email to Muraya aand Maggie (and continue if there is no error).
//
//2.6. Report success. 
