//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from "../../../outlook/v/code/app.js";
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
import main  from './main.js';
//
//import basic value from schema library.
import * as lib from '../../../schema/v/code/library';
//
import * as mod from '../../../outlook/v/code/module.js';
//
//Import schema from the schema library.
import * as schema from '../../../schema/v/code/schema.js';
//
import * as quest from '../../../schema/v/code/questionnaire.js';
//
//Load table data from mutallco_rental.
export class rental_data extends outlook.terminal implements mod.questionnaire {
    //
    //The database to save the data.
    public dbname = "mutallco_rental";
    //
    //The table to lookup the data.
    public lookup = "\\mutall\\capture\\lookup";
    //
    //create a new instance of rental class.
    constructor(mother: main){
        //
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    //Get the layouts for saving the payment data.
    get_layouts(): Array<quest.layout> {
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
    table_layout(): quest.layout {
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
        const cnames: Array<string> = this.get_column_names(tname);
        //
        //2.3 Get the body of the table as double list of string values.
        const body: Array<Array<lib.basic_value>> = this.get_body_values(cnames, tname);
        //
        //3. Compile the table layout.(Data source).
        const table_layout: quest.table = {class_name, args: [tname, cnames, body]};
        //
        //4. Return the table layout.
        return table_layout;
    }
    //
    //Get the column names.
    get_column_names(tname: string): Array<string> {
        //
    }
    //
    //Get the body of the table.
    get_body_values(cnames: string[], tname: string): Array<Array<lib.basic_value>> {
        //
    }
    //
    async check(): Promise<boolean> {
        //
        const save = await app.app.current.writer.save(this);
        //
        return save;
    }
    //
    //
    async show_panels(): Promise<void> {}
        
}