<?php
//
//Get the file sent from the front-end.
$content = $_FILES['content'];
//
//Get the temporary location where the image is uploaded to, in the server.
$tmp_name = $content['tmp_name'];
//
//Get the name of the uploaded image.
$image_name = $content['name'];
//
//Move the uploaded image from the temporary location to a desired destination.
move_uploaded_file($tmp_name, '../images/'.$image_name);
//
//Compile the image path for sending it to the database.
$path = 'http://206.189.207.206/tracker/v/code/images/'.$image_name;
//
//Send a result to the front-end.
echo json_encode(
    [
        "ok" => true,
        "data" => $path
    ]
);