<?php
//1. This is to be done by CO on request by DO.
//Catch all errors, including warnings.
\set_error_handler(function($errno, $errstr, $errfile, $errline /*, $errcontext*/) {
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});
//
//The schema is the base of all our applications; it is primarily used for
//supporting the database class
include_once __DIR__.'/schema/v/code/schema.php';
//
//We want to have access to the selector class
include_once __DIR__. '/schema/v/code/sql.php';
//
// 1. Open the mutall rental database.
$dbase = new database('mutallco_rental', true, true);
//
//1.1 Test if camilus has created new invoices for this month.
//
//a. Check the invoices for new invoices.
$invoices = "
    select 
        invoice.period
    from 
        invoice
        inner join period on invoice.period = period.period
    where
        period.cutoff > CURDATE()";
//
//b. Get the result.
$early_invoice = $this->dbase->get_sql_data($invoices);
//
//Since it has a return value of an array, loop through to see the value.
$final_invoices = array_map(fn($early_invoice)=>$early_invoice, $invoice);
//
//Return the result as a string.
$final_invoice= implode(" ",$final_invoices);
//
//1.2 If he hasnt echo false.
if($final_invoice === "") return false;
//
//At this point a new set of invoices are available.
//
//1.3 Get the balance for this month (and continue if there no error).
$balances = "
    with
        aclient as (
            select distinct
                client.client,
                client.name
            from 
                client
                inner join agreement on agreement.client=client.client
            where
                agreement.terminated is NULL and agreement.valid
        ),
        balance as(
            select 
                invoice.client,
                period.month as mon,
                period.year as yr,
                closing_balance.amount
            from 
                closing_balance 
                inner join invoice on closing_balance.invoice= invoice.invoice
                inner join period on invoice.period= period.period
        ),
        final_val as (
            select 
            aclient.name,
            balance.mon,
            balance.amount
        from 
            balance
            inner join aclient on balance.client = aclient.client
        where 
            mon = MONTH(CURDATE())and 
            yr =YEAR(CURDATE())
        )
        select 
            SUM(final_val.amount) 
        from 
            final_val";
//
//Get the result.
//
//a. Run the query
$balance = $conn->query($balances);
//
//b. Fetch the result.
$monthly_balance = $balance->fetch(PDO::FETCH_ASSOC);
//
//Map the result to get the balance.
$final_balances = array_map(fn($months_bal)=>ceil($months_bal),$monthly_balance);
//
//Return the balance as an array.
$final_balance = implode(" ", $final_balances);
//
//1.4 Get the earliest date when a payment was done for this month
//(and continue if there is no error).
$earliest_payment = "
    with 
        cutoff as(
            select 
                cutoff
            from
                period
            where
                month = MONTH(DATE_SUB(CURDATE(),INTERVAL 2 MONTH))and 
                year =YEAR((DATE_SUB(CURDATE(),INTERVAL 2 MONTH)))
        )
        select 
            min(date) as date
        from
            payment 
            inner join cutoff on cutoff.cutoff = cutoff.cutoff
        where payment.date > cutoff.cutoff";
//
//Get the result.
//
//a. Run the query
$early_payment = $conn->query($earliest_payment);
//
//b. Fetch the result.(Returns an array).
$monthly_early_payment = $early_payment->fetch(PDO::FETCH_ASSOC);
//
//Map the results to get the earliest payment date.
$early_payments = array_map(fn($months_payment)=>$months_payment, $monthly_early_payment);
//
//Return the earliest date as a string.
$final_early_payment = implode(" ",$early_payments);
//
//1.5 Compile/echo the email using the balance and earliest date.
$email ="The balances for this month is $final_balance and the earliest payment date is $final_early_payment";
//
//Write the data to a file.
$final_email = file_put_contents('email.txt', $email);


