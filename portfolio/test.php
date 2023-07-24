<?php

require_once './2023/parsedown.php';
$html = file_get_contents("./2023/wanjiru.html");
$Parsedown = new Parsedown();
$markdown = $Parsedown->text(`
<details open="" id="intern">
  <summary>5. Support for interns : Getting the interns started</summary>
  <details>
    <summary>Problem</summary>
    <ul>
      <li>The interns are not yet accustomed to the work environment.</br></li>
    </ul>
  </details>
  <details>
    <summary>Plan</summary>
    <ul>
      <li>Help them in in their assignments and guiding them</br></li>
    </ul>
  </details>
  <details>
  <summary>Outcome</summary>
    <ul>
      <li>The interns learn from their attachment</br></li>
    </ul>
  </details>      
</details> 

`);
echo $markdown;