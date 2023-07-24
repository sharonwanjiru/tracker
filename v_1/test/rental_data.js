//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from "../../../outlook/v/code/app.js";
//
//Load table data from mutallco_rental.
export class rental_data extends outlook.terminal {
    //
    //The database to save the data.
    dbname = "mutallco_rental";
    //
    //The table to lookup the data.
    lookup = "\\mutall\\capture\\lookup";
    //
    //create a new instance of rental class.
    constructor(mother) {
        //
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    //Get the layouts for saving the payment data.
    get_layouts() {
        //
        //Get the table layouts for the data from co.ke.
        return [this.table_layout()];
    }
    //
    //The structure of a questionnaire table is generally defined as:-
    // {class_name, args}
    //in particular its defined as:-
    //{class_name:"fuel", args: [tname, cnames, ifuel] }
    //where:-
    // tname is the name of the table,
    // cnames is an array of column names to be lookeup,
    // ifuel is a double array that represents the table body.
    table_layout() {
        //
        //A. Define the table that is the source of the data.
        //1.Get the table's class name.
        const class_name = "mutall\\capture\\fuel";
        //
        //2. Get the required arguments, i.e., tname, cnames, ifuel
        //
        //2.1 Get the table name.
        const tname = "payments";
        //
        //2.2 Get the column names of the table.
        const cnames = this.get_column_names(tname);
        //
        //2.3 Get the body of the table as double list of string values.
        const body = this.get_body_values(cnames, tname);
        //
        //3. Compile the table layout.(Data source).
        const table_layout = { class_name, args: [tname, cnames, body] };
        //
        //4. Return the table layout.
        return table_layout;
    }
    //
    //Get the column names.
    get_column_names(tname) {
        //
    }
    //
    //Get the body of the table.
    get_body_values(cnames, tname) {
        //
    }
    //
    async check() {
        //
        const save = await app.app.current.writer.save(this);
        //
        return save;
    }
    //
    //
    async show_panels() { }
}
