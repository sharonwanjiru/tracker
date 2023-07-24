<!DOCTYPE html>
<html lang="en">
<head>
 <title>Portfolio</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="minutes.css">
</head>
<body>
    <?php
    // include the parse down library
    require_once 'parsedown.php';
    //
    // set the file to check if it is clicked
    if (isset($_GET['file'])) {
        //
        // Get the filename from the URL
        $file = basename($_GET['file']);
     
        //$markdown_file = "pres/$filename";
        if (file_exists($markdown)) {
            $markdown = file_get_contents($markdown);
            $Parsedown = new Parsedown();
            $html = $Parsedown->text($markdown);
            echo $html;
        } 
    } 
?>
</body>    
</html>


