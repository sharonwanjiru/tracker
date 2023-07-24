<?php
namespace mutall;
//
require_once '../../../schema/v/code/schema.php';
//
require_once '../../../schema/v/code/questionnaire.php';
//
//Create the table layout for loading the data.
function ingest(){
    //
    //Create the layouts for loading the data.
    $layouts = file_get_contents("./payments.json");
    //
    //Create a questionnaire for saving the layouts.
    $q = new questionnaire($layouts);
    //
    //Use the most common way of loading layouts.
    $result/*ok | errors*/ =$q->load_common();
    //
    if($result != "ok") throw new \Exception($result);
}