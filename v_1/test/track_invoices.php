<?php
//This is to be done by CO on request by DO.
//
//USe the most basic php to check whether the invoices for this month have 
//been created and if :
//- no invoices are created echo "0".
//- invoices are created echo a "1".
//- an error echo the error.
//
//1. Connect to the database.
$servername = "localhost";
$username = "mutallco";
$password = "mutall_techub";
$conn = new PDO("mysql:host=$servername;dbname=mutallco_rental", $username, $password);
//
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//
//
$posting = "
    select 
        period.period
    from period
    where period.cutoff > "
        //This expression gets the current date one month ahead.
        ."date_add(curdate(), INTERVAL 1 month)";
//
//b. Get the result.
//
//1. Run the query
$results = $conn->query($posting);
// 
//2. Fetch the result.
$result = $results->fetch(PDO::FETCH_ASSOC);
//
if(!$result) {
    //Invoices for this month have not been posted. Report so. 
    echo '0'; 
}else {
    //Test whether there is more than one result
    $result = $results->fetch(PDO::FETCH_ASSOC);
    //
    if(!$result){
        echo '1';
    }else{
        echo 'There is more than one result (when only one was expected)';
    }  
}
