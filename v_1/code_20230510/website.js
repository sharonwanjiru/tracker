//Import outlook from the outlook library.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import server from schema library
import * as server from '../../../schema/v/code/server.js';
//
//Import the app from class page in outlook library.
import * as app from '../../../outlook/v/code/app.js';
//
//The class that drives our website from the application panel.
export class website extends outlook.baby {
    //
    //Construct class website.
    constructor(app) {
        //Call the super constructor with the app and the filename.
        super(app, "./html/web.html");
    }
    //
    //check the entered data and if correct return true else return false.
    //And prevents one from leaving the page.
    async check() { return true; }
    //
    //Implement abstract method
    async get_result() { return true; }
    //
    //Add aditional data after the page has loaded if necessary.
    async show_panels() {
        //
        //1. Populate the definers panel with our definers id and desription.
        //
        //Get the definers panel
        const select = this.get_element("services");
        //
        //Write the sql to get the id from the database.
        const query1 = `select id from definer`;
        //List of definers
        const definer = await server.exec("database", [app.app.current.dbname], "get_sql_data", [query1]);
        //
        //Formulate the list data from the definers list.
        const list = definer.map((definer) => `<li value= '${definer.id}'>${definer.id}</li>`);
        //
        //Convert list to text
        const list_str = list.join("\n");
        //
        //Attach the options to the select element.
        select.innerHTML = list_str;
        //
        //2. Populate the content panel with a query results derived from content and definers.
        //
        //Get the content panel
        const content = this.get_element("content");
        //
        const query = `
                    select 
                        id,
                        caption
                    from
                        definer`;
        //
        //List of all the caption and data in the database from the database
        const caption = await server.exec("database", [app.app.current.dbname], "get_sql_data", [query]);
        //
        //Formulate the id's and captions from the database.
        const definers = caption.map((caption) => `<div>
                            <h3>${caption.id}</h3>
                            <p>${caption.caption}</p>
                        </div>`);
        //
        //Convert the result to text.
        const definer_text = definers.join("\n");
        //
        //Paint the result on the content panel
        content.innerHTML = definer_text;
        //
        //3. Populate the header panel with definers id only
    }
}
