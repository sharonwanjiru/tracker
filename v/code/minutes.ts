//Import the page class from outtlook
import {page} from "./../../../outlook/v/code/view.js";

//Execute PHP methods from javascript
import * as server from "./../../../schema/v/code/server.js";

//
//Thus cass is for managing mainutes
export class minutes extends page{
    //
    constructor(){
        super();
    }
    
    //Override the show panels method
    public async show_panels(): Promise<void>{
        //
        //Run the query to get the minutes (data)
        const interns:Array<{surname:string, details:string}> = await this.get_minutes();
        //
        const mobile_nav:HTMLElement = this.get_element('nav_mobile');
        //
        //Use the data to show the mid-header panel.
        interns.forEach(intern=>this.show_intern(intern, mobile_nav));
        //
        //Get the navigation panel
        const nav = this.get_element('nav');
        //
        //Use the same data to how the navigation panel
        interns.forEach(intern=>this.show_intern(intern, nav));
    }
    
    //
    //Use the server library to interrogate he user_mogaka database.
    //Using the sql in minutes....
    private async get_minutes():Promise<Array<{surname:string, details:string}>>{
        //
        //Get the sql to run
        const str = 'minutes.sql';
        //
        return await server.exec(
            'database',
            ['tracker_mogaka'],
            'get_sql_data',
            [str,'file']
        )
    }
    
    private show_intern(intern:{surname:string, details:string}, where:HTMLElement):void{
        //
        // Get 
        
        
    }
    
}
