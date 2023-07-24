//
// Import the server
import * as server from "../../../schema/v/code/server.js";
//
// Import the copy , extract_fullname methods from editor.ts
import { copy, extract_fullname } from "./editor.js";
//
//Scan the minutes directory
const files = await server.exec('path', ['/tracker/v/data/minutes', false], 'scandir', []);
//
// Create the table elements and attach the data
export async function view_minutes() {
    //Get the body section of the table
    const tbody = document.getElementById('body');
    //
    //Load the data to the table
    for (const file of files) {
        //
        // Loop if the file is a file and it ends with .md
        if (file.is_file && file.name.endsWith(".md")) {
            //
            // Get the file name e.g., wanjiru_20230502.md
            const filename = file.name;
            //
            //Get the parts split using the underscore e.g., wanjiru and 20230502.md
            const part = filename.split("_");
            //
            // Get the first part which is the name e.g., wanjiru
            const minute = part[0];
            //
            //In the second part slice the last three indexes  e.g., .md to 
            //obtain a date only such as 20230502
            const date = part[1].slice(0, -3);
            //
            // Extract year
            const year = date.substr(0, 4);
            //
            // Splitting month
            const month = date.substr(4, 2);
            //
            //splitting day
            const day = date.substr(6, 2);
            //
            // Combine the day,month and year
            const dates = `${day}/${month}/${year}`;
            //
            //Create a table row
            const tr = tbody.insertRow();
            //
            //Insert one cell 1-name
            tr.insertCell().textContent = minute;
            //
            //insert cell 2-date
            tr.insertCell().textContent = dates;
            //
            //Create the view cell
            const vcell = tr.insertCell();
            //
            //Create the anchor element  
            const view = document.createElement('a');
            //
            //Attach an anchor element to the cell to view
            vcell.appendChild(view);
            //
            //Set the source of the anchor element to the file link
            view.href = `view_minute.php?file=./../data/minutes/${filename}`;
            //
            //Set the content of the anchor ro 'view 
            view.textContent = 'view';
            //create edit cell
            const ecell = tr.insertCell();
            //
            //Create the anchor element  
            const edit = document.createElement('a');
            //
            //Attach an anchor elent to the cell to edit
            ecell.appendChild(edit);
            //
            //Set the source of the anchor element to the file link
            const fil = `/tracker/v/data/minutes/${filename}`;
            edit.href = `editor.php?file=${fil}`;
            //
            //Set the content of the anchor ro 'view 
            edit.textContent = 'edit';
            //
            //create a copy cell
            const ccell = tr.insertCell();
            //
            //create a button element
            const button = document.createElement('button');
            //
            //set button class
            button.classList.add('copy');
            //
            //Attach an anchor element to the cell to copy
            ccell.appendChild(button);
            //
            //Set the content of the anchor ro 'view 2
            button.textContent = 'copy';
            // Attach the event listener to the copy button
            button.addEventListener('click', () => {
                copy(fil);
            });
            //
            //Add  cell to view all the copies of a file
            const mcell = tr.insertCell();
            //
            //Add the copies to the view_copies_column, i.e., mcell
            await add_copies(file.name, mcell);
        }
    }
}
//Add the copies to the view_copies_column, i.e., mcell
async function add_copies(full_name, mcell) {
    // 
    //Get the previous original file name
    const { name } = extract_fullname(full_name);
    //
    // Scan the directory for copies to get the files
    const files = await server.exec('path', ['/tracker/v/data/minutes/copies', false], 'scandir', []);
    //
    //loop through each file
    for (const file of files) {
        //
        // Extract the first 2 parts of copies e.g sharon_20230502_kibe.md  and extract sharon_20230502   
        const file_name = file.name;
        //
        // Use get_elements function to get the copier,copyname and filename
        const { copier, copy_name, filename } = get_elements(file_name);
        //
        // Compare if the copyname name return all the files with 
        // the first part which is the name  e.g., sharon_20230502 
        if (name === copy_name)
            add_copy(copier, mcell, filename);
    }
}
function get_elements(file) {
    //
    //Get the filename
    const filename = file;
    //
    //Get the parts of a file e.g.,sharon_20230502_kibe.md split using the 
    //underscore e.g., ["sharon","20230502","kibe.md"] 
    const part = filename.split("_");
    //
    //return the first part of the file e.g., sharon
    const owner_name = part[0];
    //
    //return the second part e.g., 20230502
    const date = part[1];
    //
    //return the copiers name e.g., kibe
    const copier = part[2].slice(0, -3);
    //Combine the name and the date to get the first part 
    const copy_name = `${owner_name}_${date}`;
    //
    // return the copier and filename
    return { copier, copy_name, filename };
}
function add_copy(copier, mcell, filename) {
    //Add the copy to the view cell, mcell
    //------------------------------------
    //
    //Create an anchor tag, i.e., <a href=...>Text</a>
    //
    const view = document.createElement('a');
    //Attach the anchor tag to the mcell
    //
    mcell.appendChild(view);
    //Set the text content of the anchor tag to copier's name
    //
    view.textContent = copier;
    //Set the source of the anchor tag to the following...
    //view)minutes.php?copies/$filename
    view.href = `view_minute.php?file=./../data/minutes/copies/${filename}`;
}
