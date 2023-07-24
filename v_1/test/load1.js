//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Load table data from mutallco_rental.
export class load_tables extends outlook.terminal {
    //
    //The database to save the data.
    dbname = "mutallco_rental";
    //
    //The table to lookup the data.
    table = "\\mutall\\capture\\lookup";
    //
    //
    constructor(mother) {
        //
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    //
    async check() {
        //
        //Get the table args.
        const rooms = this.get_room_layouts();
        //
        //Get the clients.
        const clients = this.get_client_layouts();
        //
        //Effect the room data transfer.
        const result = await server.exec('questionnaire', [clients], 'load_common', []);
        //
        //Check the result and if there is an error stop and report the error.
        if (result !== 'Ok') {
            //
            //Get the content of the html.
            const errors = this.get_element('content');
            //
            //Add the error message to the page.
            const msg = `The loading failed for '${result}' check the log file to see whats the error.`;
            //
            //Create a div and apend the text.
            errors.textContent = msg;
            //
            //Stop the loading.
            return false;
        }
        //Get the content of the html.
        const ok = this.get_element('content');
        //
        //Create the message.
        const msg = 'ok';
        //
        //Create a div element and append the value.
        ok.textContent = msg;
        //
        return true;
    }
    //
    //Get the layouts for importing and exporting the room data.
    get_room_layouts() {
        //
        //The table to load the data from.(The alias is the same as the table name).
        const tname = "room";
        //
        //An array of the column names.
        const cnames = ["uid", "is_psuedo", "title", "floor", "wing", "width_ft", "width_inch", "breadth_ft", "breadth_inch", "area_sq_m", "area_sq_ft"];
        //
        //Join the columns using comma.
        const cname = cnames.join(', ');
        //
        //Get the source of your data as a table object .
        const source = {
            //
            //The type of table to generate, derived from a query.
            class_name: this.table,
            args: [
                //
                //The local name of the table used for specifying data columns.
                `${tname}`,
                //
                //The data source query to execute.
                `select  ${cname} from ${tname}`,
                //
                //The database on which to execute the query.
                "rental_"
            ]
        };
        //Get the destination of you data as an array of labels.
        const dest = cnames.map(cname => [this.dbname, tname, [tname], cname, [this.table, tname, cname]]);
        //
        //return the source and destination layouts.
        return [source, ...dest];
    }
    //
    //Formulate the layouts for transfering client data.
    get_client_layouts() {
        //
        //Get the table name.
        const tname = "client";
        //
        //Get the column names.
        const cnames = ["name", "title", "phone", "address", "quarterly", "contact", "email"];
        //
        //Join the columns to obtain a comma separated string.
        const cname = cnames.join(", ");
        //
        //Get the source of data as a table object.
        const source = {
            //
            //The type of table to generate from the query.
            class_name: "\\mutall\\capture\\query",
            args: [
                //
                //The table name used to specify the data columns.
                `${tname}`,
                //
                //The Data source to execute.
                `select ${cname} from ${tname}`,
                //
                //The database on which to execute the query.
                "rental_"
            ]
        };
        //
        //Get the destination of the data as an array of labels.
        const dest = cnames.map(cname => [this.dbname, tname, [tname], cname, [this.table, tname, cname]]);
        //
        //Return the source and destination layouts.
        return [source, ...dest];
    }
    //
    //Additional information is added here after the user has system has loaded.
    async show_panels() { }
}
