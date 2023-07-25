 <?php

include_once "../../schema/v/code/schema.php";
include_once "../../schema/v/code/sql.php";

//
//Get the sql (for retrieving the interns) from timetable.sql
$sql = file_get_contents("./intern.sql");
//
//Create a new intern database
$dbase = new \mutall\database('tracker_mogaka', true, true);
//
//Get  the  data from the database using the sql
$days = $dbase->get_sql_data($sql);

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>TimeTable</title>
        <!-- Link to css -->
        <link rel="stylesheet" type="text/css" href="timetable_1.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="http://206.189.207.206/tracker/timetable/script.js" defer></script>
        <style>
            details details{
                margin-left: 20px;
            }
            img{
                width:50px;
                height:50px;
                overflow:hidden;
                object-fit: cover;
                border-radius: 160px;
            }
            p {
                margin: 0;
                padding: 0;
            }
            .inter {
                 border-bottom:1px solid black;
                 padding: 10px;
                 margin: 10px 0;
            }
            .highlight{
               background : lightblue;    
            }
             .next-presenter {
               background: yellow;
            }
        </style>
    </head>
    <body>
        <!-- Navigation Bar -->
        <header>
           <div class="logo">
             <p>Mutall</p>
           </div>
           <nav class="navbar">
               <a href="#" class="toggle-button">
                   <span class="bar"></span>
                   <span class="bar"></span>
                   <span class="bar"></span>
               </a>
               <div class="nav-li hide">
                  <ul class="nav-list">
                     <li class="nav"><a class="ul" href="timetable.php">Home</a></li>
                     <li class="nav"><a class="ul" href="#">About</a></li>
                     <li class="nav"><a class="ul" href="#">Portfolios</a></li>
                     <li class="nav"> <button><a class="ul" href="http://206.189.207.206/sockets/">Chat</a></button></li>
                   </ul>
               </div>
           </nav> 
        </header>
        <!-- Title and Time -->
        <h1>TimeTable</h1>    
        <h5>  
            <?php 
                echo date("l jS \of F Y ");
             ?>        
        </h5>  
        <?php 
       
            foreach($days as $day){ 

                //current date
                 $current_day = date('l');

                //Get the name of the date
                $day_name = $day['name'];

                    // Check if the current day matches the day in the loop
                 if ($current_day === $day_name) {
                     
                    $details_class = "class=\"inter highlight\"";
                } 
                else {
                    
                    $details_class = "class=\"inter\"";
                }


                echo "<details $details_class open>"
                . "<summary>$day_name</summary>";
                
               
               
                //
                foreach(json_decode($day['interns'], true) as $intern){

                    //
                    $image = $intern['image'];
                    $portfolio = $intern['portfolio'];
                    $intern_name = $intern['name'];
                    $initials = $intern['initials'];
                    $qualification = $intern['qualification'];
                    $year = $intern['year'];
                    $university = $intern['university'];

                    echo "
                        <details open>
                            <summary><a href='$portfolio'>$intern_name:</a>$initials</summary>
                            <div class=\"intern\" >                         
                                <img src='$image'/>                
                                <p>$qualification<br>
                                 $university:$year</P>                    
                            </div>

                        </details>
                    ";
                 }
            echo "</details>"; 
        }
        ?>
    </body>
</html>
