<?php
//
//Access the coonfiguration file.
require_once './save_image.php';
//
//Get the image file selected by 
$content = $_FILES['content'];
//
$finfo = new finfo(FILEINFO_MIME_TYPE);
//
//The file type, e.g., image/png or image/jpeg etc.
$type = $finfo->buffer($content);
//
//The extension format of the file.
$ext = explode('/', $type);
//
//These characters will help in formulating random numbers.
$lower_case = 'abcdefghijklmnopqrstuvwxyz';
$numeric = '1234567890';
$uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//
//Create a unique image name.
$image_name = str_shuffle($numeric.$lower_case.$numeric.$uppercase.$numeric) . '.' . $ext[1];
//
//Save the newly formulated image name to the database.
save_image($image_name);
//
$fh = fopen('./images/' . $image_name, 'w');
//
fwrite($fh, $content);
//
fclose($fh);