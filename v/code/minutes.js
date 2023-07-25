//Import the page class from outtlook
import { page } from "./../../../outlook/v/code/view.js";
//Execute PHP methods from javascript
import * as server from "./../../../schema/v/code/server.js";
//
//Thus cass is for managing mainutes
export class minutes extends page {
    //
    constructor() {
        super();
    }
    //Override the show panels method
    async show_panels() {
        alert("loaded");
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
        const str = 'minutes.sql';
        //
        return await server.exec('database', ['tracker_mogaka'], 'get_sql_data', [str, 'file']);
    }
    show_intern(intern, where) {
        //
        //Call the get_minutes function to get the sql
        //
        //Use foreach to get each element of the array returned
        //
        //Get the intern name from surname column in the sql
        //
        // json_decode the details and use foreach 
        //
        // return the surname and details
    }
}
