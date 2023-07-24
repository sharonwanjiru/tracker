//
// import the library
import * as lib from "../../../schema/v/code/library";
//
// Import the server
import * as server from "../../../schema/v/code/server.js";
//
// Import the copy method
import { copy } from "./editor.js";
//
// scan the portfolios directory
const files: Array<{
  path: string;
  name: string;
  is_file: boolean;
  properties: { [index: string]: lib.basic_value };
}> = await server.exec(
  "path",
  ["/tracker/portfolio/2023", false],
  "scandir",
  []
);

//
// create the table elements
export function view_portfolios() {
  //Get the body section of the table
  const tbody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById("body")
  );
  //
  // load data to the table
  for (const file of files) {
    if (file.is_file && file.name.endsWith(".html")) {
      //
      // Get the file name e.g., wanjiru.html
      const filename = file.name;
      //
      //Get the parts split
      const part = filename.split(".");
      //
      // Get the name part e.g., wanjiru
      const name = part[0];
      //
      // Create table row
      const tr: HTMLTableRowElement = tbody.insertRow();
      //
      //
      tr.insertCell().textContent = name;
      //
      //create the view cell
      const vcell: HTMLTableCellElement = tr.insertCell();
      //
      //create an anchor element
      const view: HTMLAnchorElement = document.createElement("a");
      //
      //Attach the anchor element to the cell view
      vcell.appendChild(view);
      //
      //set the content of the anchor to be viewed
      view.textContent = "view";
      //
      //set the source of the anchor element
      view.href = `${filename}`;
      //
      //create edit cell
      const ecell: HTMLTableCellElement = tr.insertCell();
      //
      //create an anchor element for the edit
      const edit: HTMLAnchorElement = document.createElement("a");
      //
      //Attach an anchor element to the cell to edit
      ecell.appendChild(edit);
      //
      //set the content of the anchor to edit
      edit.textContent = "edit";
      //
      //Set the cource of the anchor element
      const fil = `/tracker/portfolio/2023/${filename}`;
      //
      //Call the editor
      edit.href = `editor.php?file=${fil}`;
      //
      //Create a copy cell
      const ccell: HTMLTableCellElement = tr.insertCell();
      //
      //Create a button element
      const button: HTMLButtonElement = document.createElement("button");
      //
      //set button class
      button.classList.add("copy");
      //
      //Attach an anchor element to the cell to copy
      ccell.appendChild(button);
      //
      //Set the content of the anchor ro 'view 2
      button.textContent = "copy";
      //
      //Attach the event listener to the copy
      button.addEventListener("click", () => {
        copy(fil);
      });
    }
  }
}
