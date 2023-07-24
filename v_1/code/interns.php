<?php
include_once "../../../schema/v/code/schema.php";
include_once "../../../schema/v/code/sql.php";

//
//Get the sql (for retrieving the interns) from timetable.sql
$sql = file_get_contents("./interns.sql");
//
//Create a new intern database
$dbase = new \mutall\database('mutall_tracker', true, true);
//
//Get  the  data from the database using the sql
$interns = $dbase->get_sql_data($sql);


////
////echo as json objects
//echo json_encode($interns);
//echo "<br>";

foreach($interns as $intern){
    echo $intern['surname'];
    echo "<br>";
}
?>