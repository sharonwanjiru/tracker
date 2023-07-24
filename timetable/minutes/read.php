<?php
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
// echo $Parsedown->text($html);

require_once 'parsedown.php';

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
