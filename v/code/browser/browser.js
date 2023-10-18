//Import the page and view class from outtlook
import { page } from "./../../../../outlook/v/code/view.js";
//
// The displaying class 
export class browser extends page {
    root_folder;
    //
    //
    constructor(root_folder) {
        super();
        this.root_folder = root_folder;
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
    async show_panels() {
        alert(`You are about to browse folder '${this.root_folder}'`);
        //
        //Assume the div#root already exists.
        // Create the details for the root node and place it under the root
        //
        //Get the child foldersof the root rom teh server
        //
        //Add the children to to the root node     
        //
        //
    }
}
