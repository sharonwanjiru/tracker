//
// Import the library
import * as lib from "../../../../schema/v/code/library";
//
// Import the server
import * as server from "../../../../schema/v/code/server.js";
//
// Import mutall error from the library
import {mutall_error} from "./../../../../schema/v/code/schema.js";

//Import the page and view class from outtlook
import {page} from "./../../../../outlook/v/code/view.js";
//
//Define the folders type
type folder = {
    path: string;
    name: string;
    is_file: boolean;
    properties: { [index: string]: lib.basic_value };
}
//
// The displaying class 
export class browser extends page {
    //
    //
    constructor(public root_folder:string) {
        super();
    }
    // 
    // This method is used to show the folders inside the digital ocean. 
    // Below is a dummy of the expected output 
    /*
  
    <div id= "root">   
<!--        Mutall Projects Folder -->
        <details>
            <summary>Mutall Projects</summary>
<!--            Mashamba Subfolder-->
            <details style="margin-left:10px" >
                <summary >Mashamba</summary>
                <details style="margin-left:20px">
                    <summary>V</summary>
                    <details style="margin-left:30px">
                        <summary>code</summary>
                        <p>mashamba.ts</p>
                        <p>mashamba.html</p>
                    </details>
                </details>
                <details style="margin-left:20px">
                    <summary>Data</summary>
                    <p>mashamba.sql</p>
                </details>
            </details>
    </div>        
     */
    // 
    //  A method for displaying the server contents as listed in the html above
    async show_panels():Promise<void>{
        
        //
        //Assume the div#root already exists.
        const div = this.get_element("root");
        // Create the details for the root node and place it under the root
        const details:HTMLDetailsElement = this.create_element('details',div);
        //
        //Get the child folders of the root from the server and display them
        const child_folder = await this.child_folders();
        //
        //Add the children to to the root node 
        this.children(details,child_folder);
        //
        //     
    } 
    //
    //Get the child folders of the root from the server and display them
    async child_folders():Promise<folder[]>{
        //
        //Scan the folders on the index page
        const folders:Array<folder> = await server.exec('path', ['/', true], 'scandir', []);
        //
        // Return the folders
        return folders;
    }
    //
    //Add the children to to the root node 
    async children(details:HTMLDetailsElement,folders:folder[]){
        //
        // Check if the returned result is a file or a folder
        folders.forEach((fold) => {
            // If it is a file display the file name
            if (fold.is_file){
                //
                // Create a file anchor
                const file_anchor = this.create_element('p', details);
                // Give it the namr
                file_anchor.textContent = fold.name;
            } else
            {
                //
                // For the folders on the index page
                const child_details = this.create_element('details', details);
                //
                // Attach the folders name  to the summary
                details.innerHTML = `<summary>${fold.name}</summary>`;
                // 
                // If it has children lop through them
            if (fold) {
                this.child_folders(details);
            }
            }
        }
        );
    }
     
    
}
