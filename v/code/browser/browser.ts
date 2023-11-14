import { exec } from "../../../../schema/v/code/server.js";
//
import {
  mutall_error,
  basic_value,
} from "./../../../../schema/v/code/schema.js";
//
import { view, page } from "./../../../../outlook/v/code/view.js";
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
  //Root is the path we will start to scan for files and folders on teh server
  constructor(public root: string) {
    //
    //Initialize the inherited page
    super();
  }
  //
  // This method is used to show the paths,i.e., filesand folders in the current
  // server, starting from theroot folernamed inthe constructor.
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
    //Get the root node from the current form.
    const root = this.get_element("root");
    //
    //Get the child paths, i.e., files and folders, of the root foder.
    //N.B. The fisrt time round, the path isspecified without the document
    //root component, so, it neess to be adde
    const Ipaths: Array<Ipath> = await this.get_child_paths(this.root, true);
    //
    //Add the children to the root node
    Ipaths.forEach(Ipath => this.create_and_show_path(root, Ipath));
  }
  //
  //Get the child folders of the given path and display them
  async get_child_paths(
    path: string,
    add_root: boolean
  ): Promise<Array<Ipath>> {
    //
    //Scan the folders (on the index page??)
    const result: Array<Ipath> = await exec(
      "path",
      //
      //Assume that path is not a file
      [path, false, add_root],
      "scandir",
      []
    );
    //
    // Return the paths
    return result;
  }
  //
  //Show the given child of the given parent element
  private create_and_show_path(parent: HTMLElement, Ipath: Ipath): void {
    //
    //Define a placeholder for the path object
    let path: path | undefined;
    //
    // Create the path object
    if (Ipath.is_file) path = new file(parent, Ipath);
    else path = new folder(parent, Ipath);
    
  }
}
//
//This class models paths associated with files and folders in computer disk
abstract class path extends view {
  //Proxy is the HTML element that represents path visually.
  //public proxy:HTMLElement;
  abstract get proxy(): HTMLElement;
  abstract set proxy(element: HTMLElement);

  public full_name: string;
  public name: string;

  constructor(public parent: HTMLElement, child: Ipath) {
    super();
    this.full_name = child.path;
    this.name = child.name;
  }
  
}
//
// Class file displays the file contents
class file extends path {
  //
  public proxy: HTMLElement;

  constructor(parent: HTMLElement, child: Ipath) {
    //
    super(parent, child);
    //
    this.proxy = this.create_element("div", this.parent, {
        className: "file" 
    });
    //
    // Create the file icon
    this.create_element("img", this.proxy, {
      className: "file_icon",
      src:"./icons/files.png"
    });
    //
    // Create an element for the file name
    this.create_element("span", this.proxy, {
      className: "file_name",
      textContent:this.name
    });
    
  }
  
  

  
  //Display a file, thus implementing the abstract version
  show() {
    
  }
}
//
// Class folder displays the folder contents
class folder extends path {
  //
  public proxy:HTMLDetailsElement;  
  
  //The chidren of this folder are paths
  private children?: Array<path>;
   //
  constructor(parent: HTMLElement, child: Ipath) {
    //
    //Initialize the parent system
    super(parent, child);
    //
    // Create the details element
    this.proxy = this.create_element("details", this.parent, {
        ontoggle:() => {
            //
            // When toggled open, call the open method
            if (this.proxy.open) this.open();
        }
    });
    //
    // Create the summary elements
    const summary = this.create_element("summary", this.proxy, {
        textContent: this.name
    });
    
    // Create a <span> element to wrap the text within the summary
    this.create_element("span", summary, {
        onclick:() => this.summary_clicked()
    });
       
  }

  //
  //Populate this folder with her children if it is the first time.
  async open(): Promise<void> {
    //
    //Do not continue with this process if the children are already available
    if (this.children !== undefined) return;
    //
    //Scan the server for the children of this folder
    this.children = await this.get_children();
    //
    //Mark this folder as having children
    this.proxy.classList.add("has_children");
  }
  
  //Retrieve the childern of this folder
  async get_children():Promise<Array<path>>{
     
      //Scan the this folder for children (as Ipaths)
       console.log(this.full_name);
      const Ipaths: Array<Ipath> = await this.get_folders(this.full_name, false);
     
      
      //
      //The parent rootelement 
      const parent = this.proxy;
      //
      //Convert the the child Ipaths to paths
      const paths:Array<path> = Ipaths.map(
        Ipath=>
            Ipath.is_file 
            ? new file(parent, Ipath)
            : new folder(parent, Ipath)
        );
        //
        //Return the paths
        return paths; 
     
  }


  //
  // Get the folders inside the parent folder
  async get_folders(full_name: String,add_root: boolean ): Promise<Array<Ipath>> {
    //
    // Get the folders
    const folders: Array<Ipath> = await exec(
      "path",
      [full_name, false, add_root],
      "scandir",
      []
    );
    //
    // Return the folders
    return folders;
  }
  //
  // The event listener for the summary text
  summary_clicked() {
    alert(`clicked on the summary text of ${this.name}`);
  }
}
