<?php

require_once 'parsedown.php';
// require_once 'parsedown.php';

// $scan = scandir('pres');
// foreach($scan as $file) {
//    if (!is_dir("pres/$file")) {
//       echo $file.'
// ';
//    }
// }
// $html = file_get_contents('$file');
// $Parsedown = new Parsedown();
// echo $Parsedown->text($html)

$sftp_server = '206.189.207.206';
$sftp_user = 'mutall';
$sftp_password = 'Mutall@2023';
$sftp_directory = '/tracker/portfolio/2023';

// set up a connection or die with an error message
$conn_id = ftp_connect($sftp_server) or die("Could not connect to $ftp_server");

// log in to the FTP server
$login_result = ftp_login($conn_id, $ftp_user, $ftp_password);

// set passive mode
ftp_pasv($conn_id, true);

// get a list of files in the directory
$file_list = ftp_nlist($conn_id, $ftp_directory);

// loop through the file list and display links to each file
foreach ($file_list as $file) {
    if (!is_dir($file)) {
        echo "<a href=\"http://$ftp_server$file\">$file</a><br>";
    }
}

// close the FTP connection
ftp_close($conn_id);


// set the file to check if it is clicked
if (isset($_GET['file'])) {
    // Get the filename from the URL
    $filename = basename($_GET['file']);
    // Build the path to the Markdown file
    $markdown_file = "pres/$filename";
    //$markdown_file = "pres/$filename";
     // Load the Markdown content from the file
    if (file_exists($markdown_file)) {
        $markdown = file_get_contents($markdown_file);
        $Parsedown = new Parsedown();
        $html = $Parsedown->text($markdown);
        echo $html;
    } else {
        echo "File not found";
    }
} else {
    //$scan = scandir('http://206.189.207.206/tracker/portfolio/2023/');
    $scan = scandir('pres');
    foreach ($scan as $file) {
        if (!is_dir("pres/$file")) {
            echo "<a href=\"?file=$file\">$file</a><br>";
        }
    }
}


?>
