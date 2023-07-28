//Import the page class from outtlook
import { page } from "./../../../outlook/v/code/view.js";
//Execute PHP methods from javascript
import * as server from "./../../../schema/v/code/server.js";
//
//Thus cass is for managing mainutes
export class presentation extends page {
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
        const mobile_nav = this.get_element('nav_mobile');
        //
        //Use the data to show the mid-header panel.
        interns.forEach(intern => this.show_intern(intern, mobile_nav));
        //
        //Get the navigation panel
        const nav = this.get_element('nav');
        //
        //Use the same data to how the navigation panel
        interns.forEach(intern => this.show_intern(intern, nav));
    }
    //
    //Use the server library to interrogate he user_mogaka database.
    //Using the sql in minutes....
    async get_minutes() {
        //
        //Get the sql to run
        const str = '/tracker/v/code/presentation.sql';
        //
        return await server.exec('database', ['tracker_mogaka'], 'get_sql_data', [str, 'file']);
    }
    //The details of the intern are the projects that s/he is working on. Under 
    //those projects are dates of the various presenttaions. Mogaka will show the
    //minutes of the presentations as a separate application. Here is an exemple 
    //of teh html that is required to show the projects
    /*
    <detail class='presenter'>
        <summary>$surname</summary>
        
        <details class='project'>
           <summary>$project1</summary>
           <p class='presentaion'>$date11</p>
           <p>$date12</p>
           <p>$date13</p>
        </details>
        
        <details class='project'>
           <summary>$project2</summary>
           <p class='presetation' onclick=presentation.show_presentation(2)>$date21</p>
           <p onclick=mogaka(3)>$date22</p>
           <p>$date23</p>
        </details>
        ....
    </details>
     */
    //To show an intern is to populate the HTML where element such it lookes 
    //the example above  
    show_intern(intern, anchor) {
        //
        //1. Clarify the contents of the projects (json) string
        const projects = JSON.parse(intern.projects);
        //
        //Create details tag and append it to the anchor
        const details = this.create_element('details', anchor, { className: 'presenter' });
        //
        //Creat the summary tag (with surnamecontent) and attatch it to the details tag
        this.create_element('summary', details, { textContent: intern.surname });
        //
        //Output the projects, one by one, attaching them to the details
        projects.forEach(project => this.show_project(project, details));
    }
    // Show the projects in project of type project which has presentation date,
    //  file and presentation(primary key), the presentation. The details are 
    //  then presented in detail summary tags as below
    /*
        <details class='project'>
              <summary>$project1</summary>
              <p class='presentaion'>$date11</p>
              <p>$date12</p>
              <p>$date13</p>
        </details>
     */
    show_project(project, anchor) {
        //
        //Get the contents in project(file,date and PK)
        //
        //Create details tag and append it to the anchor with class 'project'
        //
        //Create the summary tag and attach it to the details tag
        //
        // Create the P tag and give it class presentation     
    }
}
