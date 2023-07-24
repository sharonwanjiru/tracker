<!DOCTYPE html>
<html lang="en">
<head>
 <title>Portfolio</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
     a
     ,td{
        font-size: 25px;
        line-height:1.7;    
     }   
     p,li,code{
        font-size: 22px;
     }
     table {
       border: 1px solid black;
       width: 100%;
     }
     th,
     td {
       border: 1px solid black;
      }
     th {
      font-size: 25px;
      font-weight: 600px;
      background: green;
     }
    table tr:nth-child(odd) td {
      background: rgb(181, 236, 190);
    }
    table tr:nth-child(even) td {
      background: white;
    }
  </style>
</head>
<body>
<?php
// Scanning the directory
 $files = scandir('./');
 //exclude .php extension
 $excludedExtensions = array(
  'php',
  'ts',
  'css',
  'js',
  'json'
);
echo
    //
    //display the title of the table
    "
    <table class=\"footable\">
     <tr>
      <th>Name</th>
      <th>View</th>
      <th>Edit</th>
     </tr>
    ";

 //looping through each file
 foreach ($files as $file) {
     if ($file != "." && $file != ".." && !in_array(pathinfo($file, PATHINFO_EXTENSION), $excludedExtensions)){
       // removing the extension and remaining with the name
      $name = pathinfo($file, PATHINFO_FILENAME);
      //on clicking the link
      if (isset($_GET['file'])) {
        // getting the file name and reading 
         $filename = $_GET['file'];
        if (is_file($filename)) {
         file_get_contents($filename);
        }
      }
      echo
         "
            <tr>
                <td>$name</td>
                <td><a href=\"$file\">view</a><br></td>
                <td><a href=\"editor.php?file=$file\">edit</a><br></td>
            </tr>
          " ;
         // echo "<a href=\"$file\">$file</a><br>";
     }
 }
 echo "</table>";
?>
</body>
</html>


