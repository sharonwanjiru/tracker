<?php
//
//Access the configuration file to save items in the database.
require_once 'config.php';
//

//
function save_image($image_name){
    global $conn;
    //
    //Save the image name t
    $stmt = $conn->prepare("INSERT INTO image(name, user)VALUES('$image_name', '1342')");
    $stmt->execute();
    //
    echo 'success';
}