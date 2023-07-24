
function sample1(){
    //
    //Uae Javsscript to create a simple table
    //
    ///Get the body section of the table
    const tbody:HTMLTableSectionElement = <HTMLTableSectionElement>document.getElementById('body');
    //
    //Create a new row
    const tr:HTMLTableRowElement = tbody.insertRow();
    //
    //Add 4 cells to the row
    const cell1: HTMLTableCellElement = tr.insertCell(); cell1.textContent='1';
    const cell2:HTMLTableCellElement = tr.insertCell(); cell2.textContent='2';
    const cell3:HTMLTableCellElement = tr.insertCell(); cell3.textContent='3';
    const cell4:HTMLTableCellElement = tr.insertCell();; cell4.textContent='4';
    const cell5:HTMLTableCellElement = tr.insertCell();; cell5.textContent='5';
    
    
}

import * as lib from "../../../../schema/v/code/library";


import * as server from "../../../../schema/v/code/server.js";

import {copy} from "./editor.js";

const files:Array<{
		path: string;
		name: string;
		is_file: boolean;
		properties: { [index: string]: lib.basic_value };
	}> = await server.exec('path', ['/tracker/minutes/v', false], 'scandir', []);


export function view_minutes(){
    
    //Get the body section of the table
    const tbody:HTMLTableSectionElement = <HTMLTableSectionElement>document.getElementById('body');
    //
    //Load the data to the table
    for(const file of files){
        if (file.is_file && file.name.endsWith(".md")){
            const filename = file.name;
            const part = filename.split("_");
            const minute = part[0];
            const date =part[1].slice(0,-3);
            
            //
            //Create a table row
            const tr:HTMLTableRowElement = tbody.insertRow();

            //
            //Insert one cell 1-name
            tr.insertCell().textContent=minute; 
            
            //
            //insert cell 2-date
            tr.insertCell().textContent=date;
            
            //
            //Create the view cell
            const vcell: HTMLTableCellElement = tr.insertCell();
            
            //
            //
            //Create the anchor element  
            const view: HTMLAnchorElement = document.createElement('a');
            //
            //Attach an anchor element to the cell to view
            vcell.appendChild(view);

            //Set the source of the anchor element to the file link
            view.href = `view_minute.php?file=${filename}`; 
            //
            //Set the content of the anchor ro 'view 
            view.textContent = 'view';
            //create edit cell
            const ecell: HTMLTableCellElement = tr.insertCell();
            //
            //Create the anchor element  
            const edit: HTMLAnchorElement = document.createElement('a');
            //
            //Attach an anchor elent to the cell to edit
            ecell.appendChild(edit);
            //Set the source of the anchor element to the file link
            edit.href = `editor.php?file=${filename}`; 
            //
            //Set the content of the anchor ro 'view 
            edit.textContent = 'edit';
            

            //
            //create a copy cell
            const ccell: HTMLTableCellElement = tr.insertCell();
            //
            //create a button element
            const button: HTMLButtonElement = document.createElement('button');
            //
            //set button class
            button.classList.add('copy');
            //
            //Attach an anchor element to the cell to copy
            ccell.appendChild(button); 
            //
            //Set the content of the anchor ro 'view 
            button.textContent = 'copy';
            // Attach the event listener to the copy button
            button.addEventListener('click', () => {
              copy(`/tracker/minutes/v/${file.name}`);
            });  
                     
        }
    }
}
 