import {exec} from "../../../../schema/v/code/server.js";
//
import { mutall_error, basic_value } from "./../../../../schema/v/code/schema.js";
//
import { page } from "./../../../../outlook/v/code/view.js";
//
// Define the type
type Ipath = {
    //
    //The full name of thepath    
    path: string; 
    //
    //Base nane
    name: string;
    //
    //Indicator whether this path is for a file or folder
    is_file: boolean;
    properties: { [index: string]: basic_value }; //e.g., {date_of_modificatin:'2013-13-04 20:00'}
};
//
// The displaying class
export class browser extends page {
    //
    //
    constructor() {
      super();
    }
    //
    // This method is used to show the folders inside the digital ocean.
    // Below is a dummy of the expected output
    /*

        <div id= "root">   
            <details>
                <summary>x1</summary>
            </details>
            <details>
                <summary>x2</summary>
            </details>

            ...
        </div>        
    */
    //
    //  Display the server contents as listed in the html above
    async show_panels(): Promise<void> {
        //
        //Get the root node.
        const root = this.get_element("root");
        //
        //Get the child paths, i.e., files and folders, from the server
        const paths: Array<Ipath> = await this.get_child_paths("/schema/v/code");
        //
        //Add the children to the root node
        paths.forEach(path=>this.show_child(root, path));
    }
    //
    //Get the child folders of the root from the server and display them
    async get_child_paths(path:string): Promise<Array<Ipath>> {
        //
        //Scan the folders on the index page
        const result: Array<Ipath> = await exec(
          "path",
          [path, false],//Asuume that path is not a file
          "scandir",
          []
        );
        //
        // Return the paths
        return result;
    }
    //
    //Show the given child of the given parent element
    show_child(parent: HTMLElement, child: Ipath): void{
        //
        //Define a path object
        let path:path|undefined;
        //
        // Create the path object
        if (child.is_file) path = new file(parent, child)
        else path = new folder(parent, child);
        //
        //Show the path
        path.show();
    }
} 
//
// A class for defining a path object
 abstract class path {
    //
    constructor(){
    }
    //
    // The showmethod that will be overridden
    abstract show():void;   
}
//
// Class file displays the file contents
class file extends page{
    //
    constructor(parent:HTMLElement,child:Ipath){
        super();
        //
        // Initialize parent 
        this.parent = parent;
        //
        // Initialize child
        this.child = child;
        
    }
    //
    // Define properties for the file class
    parent: HTMLElement;
    child: Ipath;
    show(){
        // Create a div to attach the file
        const file: HTMLDivElement = this.create_element('div', this.parent);
        //
        // Attach the file name to the div
        file.textContent = this.child.name;
    }
}
//
// Class folder displays the folder contents
class folder extends page implements path{
    //
    constructor(parent:HTMLElement,child:Ipath){
        super();
        //
        // Initialize parent 
        this.parent = parent;
        //
        // Initialize child
        this.child = child;
    }
    //
    // Define properties for the file class
    parent: HTMLElement;
    child: Ipath;
    show(){
        //
        // Create the details element
        const details: HTMLDetailsElement = this.create_element('details', this.parent);
        //
        // Add event listener for the details icon
        details.addEventListener('click', () => {
            this.details_clicked(this.child);
        });
        //
        // Create the summary elements 
        const summary: HTMLElement = this.create_element('summary',details);
        //
        // Attach the folder name to the summary
        summary.textContent = this.child.name;
        //
        // Add event listener for the summary text
        summary.addEventListener('click', () => {this.summary_clicked(this.child);});
    }
    //
    // The event listener for the details icon
    details_clicked(fold:Ipath){
        alert(`clicked on the detail icon of ${fold.name}`);
    }
    //
    // The event listener for the summary text
    summary_clicked(fold:Ipath){
        alert(`clicked on the summary text of ${fold.name}`);
    }
}
