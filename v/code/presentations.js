//Import the page class from outtlook
import { page } from "../../../outlook/v/code/view.js";
import { template } from "../../../outlook/v/code/outlook.js";
//
//
import * as server from "../../../schema/v/code/server.js";
//
//Thus cass is for managing liss of presenttaions
export class presentations extends page {
    //
    constructor() {
        super();
    }
    //Override the show panels method
    async show_panels() {
        //
        //Run the query to get the minutes (data)
        const interns = await this.get_minutes();
        //
        const mobile_nav = this.get_element("nav_mobile");
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
    async get_minutes() {
        //
        //Get the filethat has the sql to run
        const str = "/tracker/v/code/presentations.sql";
        //
        //Execute the esql and get the database rows
        const rows = await server.exec("database", ["tracker_mogaka"], "get_sql_data", [
            str,
            "file",
        ]);
        //
        //Convert the resuting rows to an array of interns
        const interns = rows.map((row) => ({
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
    show_intern(intern, anchor) {
        //
        //Desturcture the intern to reveal its  contents
        const { surname, presentations } = intern;
        //
        //Create details tag and append it to the anchor
        const details = this.create_element("details", anchor, {
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
    show_presentation(p, anchor) {
        //
        //Create the div tag
        const div = this.create_element("div", anchor, {
            textContent: p.date,
        });
        //
        //get the contemtent anchor tag
        const content = this.get_element("content");
        //        //
        //        //Get mogakas project
        //        const project = new mogaka.project(p.presentation, content);
        //        //
        //        //Attach the mokaga'sevent
        //
        //        div.onclick = async () => await this.project.show_panels();
        div.onclick = async () => this.show_minutes("demo", "content", "minutes_demo.html");
    }
    async show_minutes(source_id, dest_id, file) {
        //
        // Create an instance of template clkass
        const Template = new template(file);
        //
        //
        const dest = [this, dest_id];
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
