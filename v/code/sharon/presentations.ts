//Import the page class from outtlook
import { page, view } from "../../../outlook/v/code/view.js";

//The project interface was delevopled by mogaka; hence the namespace
import * as mogaka from "./presentation.js";

import { template } from "../../../outlook/v/code/outlook.js";
//
//
   
import * as server from "../../../schema/v/code/server.js";

type Iintern = {
  intern: number;
  surname: string;
  presentations: Array<Ipresentation>
}

//The desired structire of the data for project
export type Ipresentation = {
  presentation: number;
  date: string
}

//
//Thus cass is for managing liss of presenttaions
export class presentations extends page {
  //
  constructor() {
    super();
  }
  //Override the show panels method
  public async show_panels(): Promise<void> {
    //
    //Run the query to get the minutes (data)
    const interns: Array<Iintern> = await this.get_minutes();
    //
    const mobile_nav: HTMLElement = this.get_element("nav_mobile");
    //
    //Use the data to show the mid-header panel.
    interns.forEach((intern) => this.show_intern(intern, mobile_nav));
    //
    //Get the navigation panel
    const nav = this.get_element("nav");
    //
    //Use the same data to how the navigation panel
    interns.forEach((intern) => this.show_intern(intern, nav));
  }

  //
  //Use the server library to interrogate he user_mogaka database.
  //Using the sql in minutes....
  //Return the internsand thoer presentations
  private async get_minutes(): Promise<Array<Iintern>> {
    //
    //Get the filethat has the sql to run
    const str = "/tracker/v/code/presentations.sql";
    //
    //Execute the esql and get the database rows
    const rows: Array<{
      intern: number;
      surname: string;
      presentations: string;
    }> = await server.exec("database", ["tracker_mogaka"], "get_sql_data", [
      str,
      "file",
    ]);
    //
    //Convert the resuting rows to an array of interns
    const interns: Array<Iintern> = rows.map((row) => ({
      intern: row.intern,
      surname: row.surname,
      presentations: JSON.parse(row.presentations),
    }));
    //
    //Return the interns
    return interns;
  }

  //This ia a snippet of the required HTML elements, thatare hooked tothe
  //gven anchor tag
  /*
    <detail class='intern'>
        <summary>$surname1</summary>
        <p class='presentation' onclick=presentation.show_presentation(1)>$date11</p>
        <p>$date12...</p>
        <p>$date13...</p>
    </details> 
        
    <details class='intern'>
       <summary>$surname2</summary>
       <p class='presetation' onclick=presentation.show_presentation(2)>$date21</p>
       <p onclick=mogaka(3)....>$date22</p>
       <p>$date23....</p>
    </details>
    ...
    The data to popuate this HTML will come from a database with this 'full'; 
    structure:-
    intern = {surname:string, presenttaions:Array<presentation>}
    
    where
  
    Ipresentation =  {preentation:number, date:string}
     */
  private show_intern(intern: Iintern, anchor: HTMLElement): void {
    //
    //Desturcture the intern to reveal its  contents
    const { surname, presentations } = intern;
    //
    //Create details tag and append it to the anchor
    const details: HTMLDetailsElement = this.create_element("details", anchor, {
      className: "presenter",
    });
    //
    //Create the summary tag (with surname content) and attach it to the details tag
    this.create_element("summary", details, { textContent: surname });
    //
    //Output the presentaions, one by one, attaching them to the details
    presentations.forEach((p) => this.show_presentation(p, details));
  }

  /*
     <div onclick='mogaka.show_minutes($pk)'> $date </div> 
     */
  private show_presentation(p: Ipresentation, anchor: HTMLElement) {
    //
    //Create the div tag
    const div: HTMLElement = this.create_element("div", anchor, {
      textContent: p.date,
    });
    //
    //get the contemtent anchor tag
    const content: HTMLElement = this.get_element("content");
    //        //
    //        //Get mogakas project
    //        const project = new mogaka.project(p.presentation, content);
    //        //
    //        //Attach the mokaga'sevent
    //
    //        div.onclick = async () => await this.project.show_panels();
    div.onclick = async () =>this.show_minutes("demo", "content", "minutes_demo.html");
  }

  private async show_minutes(source_id: string,dest_id: string,file: string): Promise<void> {
    //
    // Create an instance of template clkass
    const Template = new template(file);
    //
    //
    const dest: [view, string] = [this, dest_id];
    //
    //
    await Template.open();
    //
    //
    Template.copy(source_id, dest);
    //
    //
    Template.win.close();
  }
}
