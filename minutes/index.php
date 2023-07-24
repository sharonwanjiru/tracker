<!DOCTYPE html>
<html lang="en">
<head>
 <title>Portfolio</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="minutes.css">
    <script src="editor.js"></script>
</head>
<body>
<?php
    // include the parse down library
    require_once 'parsedown.php';
    // set the file to check if it is clicked
    if (isset($_GET['file'])) {
        // Get the filename from the URL
        $filename = basename($_GET['file']);
        //
        // Build the path to the Markdown file
        $markdown = "./$filename";
        //
        //$markdown_file = "pres/$filename";
        if (file_exists($markdown)) {
            $markdown = file_get_contents($markdown);
            $Parsedown = new Parsedown();
            $html = $Parsedown->text($markdown);
            echo $html;
        } 
    } 
   //
   else 
        {
         $files = scandir('./');
         //
         //exclude extensions that are not md
         $excludedExtensions = array(
             'php',
             'js',
             'ts',
             'css',
             'json'
         );
    echo
    //
    //display the title of the table
    "
    <table class=\"footable\">
     <tr>
      <th>Name</th>
      <th>Date</th>
      <th>View</th>
      <th>Edit</th>
      <th>Copy</th>
     </tr>
    ";
    //
    // loop through each file
    foreach ($files as $index => $file) {
        if ($file != "." && $file != ".." && !in_array(pathinfo($file, PATHINFO_EXTENSION), $excludedExtensions)){
        // split the name and date
          $name = preg_replace('/_[0-9]+\.md$/', '', $file);
          $date = preg_replace('/^[a-z]+_|\.md$/i', '', $file);
          $copy = "copy_$index"; 
          echo
         "
            <tr>
                <td>$name</td>
                <td>$date</td>
                <td><a  href=\"?file=$file\">View</a><br></td>
                <td><a  href=\"editor.php?file=$file\">Edit</a><br></td>
                <td><button id=\"copy\"> copy </button></td>
            </tr>
          " ;
        }
    }
    echo "</table>";
}
?>
</html>


