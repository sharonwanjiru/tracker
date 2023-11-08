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
  constructor(public root:string) {
   //
    //Initialize the inherited page     
    super();
  }
  //
  // This method is used to show the paths,i.e., filesand folders in the current
  // server, startin from theroot folernamed inthe constructor.
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
    const paths: Array<Ipath> = await this.get_child_paths(this.root, true);
    //
    //Add the children to the root node
    paths.forEach((path) => this.show_child(root, path));
  }
  //
  //Get the child folders of the given path and display them
  async get_child_paths(path: string, add_root:boolean): Promise<Array<Ipath>> {
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
  show_child(parent: HTMLElement, child: Ipath): void {
    //
    //Define a path object
    let path: path | undefined;
    //
    // Create the path object
    if (child.is_file) path = new file(parent, child);
    else path = new folder(parent, child);
    //
    //Show the path
    path.show();
  }
}
//
//This class models paths associated with files and folders in computer disk
abstract class path extends view {

    //Proxy is the HTML element that represents path visually.
    //public proxy:HTMLElement;
    abstract get proxy():HTMLElement;
    abstract set proxy(element:HTMLElement);

    public full_name: string;
    public name: string;
    
    constructor(public parent: HTMLElement, child: Ipath) {
      super();
      this.full_name = child.path;
      this.name = child.name;

    }
    //
    // The show method must be implemented by extensions of this class
    abstract show(): void;
}
//
// Class file displays the file contents
class file extends path {
    //
    public div:HTMLElement;

    constructor(parent: HTMLElement, child: Ipath) {
      //
      super(parent, child);

      this.div = this.create_element("div", this.parent);
    }

    get proxy():HTMLElement{return this.div;}

    //Display a file, thus implementeing the abstarct version
    show() {
        //
        // Attach the file name to the div
        this.div.textContent = this.name;
    }
}
//
// Class folder displays the folder contents
class folder extends path {
  //
  // The summary in which to attach a text???????
  private summary: HTMLElement;

  details:HTMLDetailsElement;

  //
  constructor(parent: HTMLElement, child: Ipath) {
    //
    //Initialize te parent system
    super(parent, child);
    //
    // Create the details element
    this.details = this.create_element("details", this.parent);
    //
    // Add event listener for the details icon
    this.details.onclick = () => this.details_clicked(this.name);
    //
    // Create the summary elements
    this.summary = this.create_element("summary", this.details);
    //
    // Add event listener for the summary text
    this.summary.click = () =>this.summary_clicked(this.name);
    
  }


  get proxy():HTMLDetailsElement{return this.details;}

  //
  // Define properties for the file class
  async show() {
    //
    // Attach the folder name to the summary
    this.summary.textContent = this.name;
    //
    // Check if the folder has children 
    //const folder = await this.get_folders(this.full_name,false);
    //
    //Check if thereare children inside the folders
     
   }
  //
  // Get the folders inside the parent folder
  async get_folders(full_name:String, add_root:boolean):Promise<Array<Ipath>>{
      //
      // Get the folders
      const folders: Array<Ipath> = await exec(
      "path",
      [full_name, add_root],
      "scandir",
      []
    );
    //
    // Return the folders
    return folders;
  }
  //
  // The event listener for the details icon
  details_clicked(name: String) {
    alert(`clicked on the detail icon of ${this.name}`);
  }
  //
  // The event listener for the summary text
  summary_clicked(name: String) {
    alert(`clicked on the summary text of ${this.name}`);
  }
}
