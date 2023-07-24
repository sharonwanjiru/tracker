<?php
$file = $_GET['file'];
?>
<html>
  <head>
    <title>Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Adding the css styling sheet -->
    <link rel="stylesheet" type="text/css" href="portfolio.css">
    <script type="module">
      //  
      //importing a function from the editor.js
      import { editor } from "./editor.js";
      //
      ///Set the file name to whatever we want
      const file = '<?php echo $file; ?>';
      //
      //loading the window on loading to run the file in the editor
      window.onload = async () => await editor(file);
      
    </script>
  </head>
  
  <body>
    
      
    <h2>Portfolio</h2>
    <!-- The text area -->
    <textarea id="content"></textarea><br />
    <!-- The save button -->
    <div class="btn">
    <button id="save">Save</button>
    </div>
    
  </body>
</html>
