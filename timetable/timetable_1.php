<?php
//
//Open the csv file for reading
$stream = fopen('interns.csv', 'r');

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>TimeTable</title>
        <!-- Link to css -->
        <!-- <link rel="stylesheet" type="text/css" href="http://206.189.207.206/tracker/timetable/timetable.css"> -->
        <link rel="stylesheet" type="text/css" href="timetable.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="http://206.189.207.206/tracker/timetable/script.js" defer></script>
       
    </head>
    <body>
     <!-- Navigation Bar -->
    <header>
        <div class="logo">
          <p>Mutall</p>
        </div>
          <nav>
            <ul class="nav-list">
              <li class="nav"><a class="ul" href="timetable.php">Home</a></li>
              <li class="nav"><a class="ul" href="#">About</a></li>
              <li class="nav"><a class="ul" href="#">Portfolios</a></li>
            </ul>
          </nav>  
          <button><a class="ul" href="#">Chat</a></button>
       
		</header>
        <!-- Title and Time -->
     <div class="title">
        <h1>TimeTable</h1>
     </div>
     <div class="time">
        <h5>  
        <?php 
            echo date("l jS \of F Y ");
         ?>        
        </h5>  
    </div>
    
    <?php
    //
    //Step throu each intern and view their details
    while (($intern = fgetcsv($stream)) !== false) {
        $name =$intern[0];
        $initials=$intern[1];
        $day = $intern[2];
        $image =$intern[3];
        $portfoliolink = $intern[4];
        $qualification =$intern[5];
        $year = $intern[6];        
    ?>
        
     <div class="day <?php if(date('l') == $day) echo 'highlight'; ?> " id="monday">
         <h2><?php echo $day?></h2>
          
          <div class="details">   
                <div class="img">
                    <img class="rounded-corners" src="<?php echo $image; ?>" alt="" 
                        >
                </div>     
            <div class="portfolio">
                <a href="<?php echo $portfoliolink; ?>"><?php echo $name;?>(<?php echo $initials;?>)</a><br>
                <p><small><?php echo $qualification; ?>:<?php echo $year; ?></small></p>
            </div>        
          </div>
    <?php
    }
    fclose($stream);
    ?>

    </body>
</html>

