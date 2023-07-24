<?php

//
//The assignment
function assignment(){
    //
    // 1. Formulate a query for extracting the workplan of an intern
    $query = "select
        intern.surname,
        project.name,
        minute.number,
        minute.summary,
        minute.detail
       from minute
       join `presentation` on minute.`presentation` = `presentation`.`presentation`
       join project on minute.project = project.project
       join intern on`presentation`.intern = intern.intern
       where `presentation`.`intern` = 16";

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
    if (!$result) {
        die('Error executing the query: ' . mysqli_error($conn));
    }
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
    $previous_name='';
    foreach($rows as $row ){
        $name = $row['name'];
        $number = $row['number'];
        $summary = $row['summary'];
        $detail = $row['detail'];
        //
        // Display the project name if it is different from the previous one
        if ($name !== $previous_name) {
            $md .= "# $name \n";
            $previous_name = $name;
        }
        //
        // Compile the results to md-compatible text
        $md .= "$number $summary - $detail ";
        $md .= "\n";
    }
   return $md;
}
//
//save the md file
function save_md($md, $filename) {
    //
    // specify directory
    $directory ='./../data/minutes/wanjiru/';
    //
    //create the full paths
    $path = $directory .$filename;
     
    //
    // Checking whether file exists or not
    if (!file_exists($directory)) {
        //
        // Create a new file or direcotry
        mkdir($directory, 0777, true);
    }  
        //
        // Save the compiled results as an md file
    if (file_put_contents($path, $md) !== false) {
       echo $filename."saved";
       echo '<script>alert("Minutes saved successfully")</script>';
    } 
}
