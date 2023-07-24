<?php
//
//The assignment
function assignment(){
    //
    // 1. Formulate a query for extracting the workplan of an intern
    $query = "Select "
        . "intern.surname "
        . "project.name, "
        . "project.problem, "
        . "project.plan, "
        . "project.outcome "
        . "from "
        . "project "
        . "join `work plan` ON project.`work plan` = `work plan`.`work plan` "
        . "join intern ON `work plan`.intern = intern.intern "
        . "where `work plan`.`work plan` = 6";
    //
    //2. Execute the sql, against the tracker_mogaka database to get the array of results
    $results = execute($query);
    //
    //3.Formulate the name of the file to save as minutes under the name of the intern
    $name = filename($results);
   
    //4. Compile the array of results into md-compatble text
    $md = create_md($results);
    //
    //5.Save the compiled results as an md file
    save_md($md, $name);
}
assignment();

//
// Getting the connection from Mogaka Database
function get_connection(){
    //
    // Get database credantials
    $username = "root";
    $password = "";
    $host = "localhost";
    $dbname = "tracker_mogaka";
    // Connection
    $conn = mysqli_connect($host, $username, $password, $dbname);
    // Return the connection
    return $conn;
}
//Execute the sql, against the tracker_mogaka database to get the array of results
function execute(string $query):array{
    $conn = get_connection();
    $result =  mysqli_query($conn, $query);
    $rows = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $rows[] = $row;
    }
    return $rows;
} 
//creating the filename of the workplan as a minutes
function filename($rows){
    // Get the current date in the formart year, month and date e.g., 20230406
    $date = date("Ymd");
    //formulate the filename
    $surname = $rows[0]['surname'];
    $filename = $surname . "_" . $date . ".md"; //
    return $filename;
    
}
//
// create the md structure
function create_md($rows){
    $md = '';
    foreach($rows as $row ){
        //
        // Compile the results to md-compatible text
        $md .= "# " . $row['name'] . "\n";
        $md .= "## Problem\n";
        $md .= $row['problem'] . "\n";
        $md .= "## Plan\n";
        $md .= $row['plan'] . "\n";
        $md .= "## Outcome\n";
        $md .= $row['outcome'] . "\n";
    }
    return $md;
}
//
//save the md file
function save_md($md, $filename) {
    //
    // specify directory
    $directory ='./../data/minutes/';
    //
    //create the full paths
    $path = $directory .$filename;
    // Save the compiled results as an md file
    if (file_put_contents($path, $md) !== false) {
       echo $filename."saved";
       echo '<script>alert("Portfolio saved successfully")</script>';
    } 
}