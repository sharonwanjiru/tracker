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
import * as quest from '../../../schema/v/code/questionnaire.js';
import { Ifuel } from '../../../schema/v/code/library.js';
//
//Load table data from one database to another.
export class load_tables 
    extends outlook.terminal 
{
    //
    //The database to save the data.
    public dest_dbname = "rental_";
    //
    //The database to query.
    public source_dbname = "mutallco_rental";
    //
    //The table to lookup the data.
    public table = "\\capture\\lookup";
    //
    //Initiate a new class instance.
    constructor(mother: main){
        //
        //Call the super with the mother and html.
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    async check(): Promise<boolean> {
        //
        //Get the table args.
        const layouts: Array<Array<quest.layout>> = await this.get_layouts();
        //
        //Loop through the array of array layouts and load each.
        const results= await Promise.all(layouts.map(async layout=> {
            //
            //Effect the room data transfer.
            const result:'Ok' | string = await server.exec(
                'questionnaire',
                [layout],
                'load_common',
                []            
            );
            //
            //Check the result and if there is an error stop and report the error.
            if(result !== 'Ok') {
                //
                //Return false.
                return false;
            }
            //
            return true;
        }));
        //
        //Loop through the array and test for the results.
        for(let result of results){
            //
            //Test the results for any errors.
            if(result !== true) {
                //
                //Get the content of the html.
                const errors = this.get_element('content');
                //
                //Add the error message to the page.
                const msg = `The loading failed for '${result}' check the log file to see whats the error.`;
                //
                //Create a div and apend the text.
                errors.textContent = msg ;
            }
            return true; 
        }
        if(!results) {alert('Error occured');}
        //
        //Else
        alert('Ok');
        return true;
    }
    //
    //Get the layouts of all tables to load the data from one database
    //to another database.
    async get_layouts(): Promise<Array<Array<quest.layout>>>{
        //
        //Get the table to load the data from.
        const tnames: Array<string>= ["client", "msg", "wmeter","room", "emeter", "eaccount", "period", "service", "business"];
        //
        //Use the table names to formulate a double array of layouts for each table.
        const table_layouts = await Promise.all(tnames.map(async tname => {
            //
            //Get all the column names of the above table.
            const cnames:Array<string> = await this.get_column_names(tname);
            //
            //Get the table layout for loading data.
            const table_layout:Array<quest.layout> =await this.get_table_layout(cnames, tname);
            //
            //Return the array of layouts.
            return table_layout;
        }));
        //
        //Return the double array of layouts.
        return table_layouts;
    }
    //
    //Get the table layout for data from one database to another database.
    async get_table_layout(cnames: string[], tname: string):Promise<Array<quest.layout>> {
        //
        //Convert the array to a comma separated string.
        const cname = cnames.join(', ');
        //
        //Get the source of the data as a table object.
        const source:quest.table = {
            //
            //The type of table to generate, derived from a query.
            class_name: "\\mutall\\capture\\query",
            args: [
                //
                //The local name of the table used for specifying data columns.
                `${tname}`,
                //
                //The data source query to execute.
                `select ${cname} from ${tname}`,
                //
                //The database on which to execute the query.
                `${this.source_dbname}`
            ]
        }
        //Get the destination of you data as an array of labels.
        const dest: Array<quest.label> = cnames.map(cname =>
            [this.dest_dbname, tname, [tname], cname, [this.table, tname, cname]]
        );
        //
        //Return the source and destination as an array.
        return [source, ...dest];
    }
    //Get the column names of the tables provided.
    async get_column_names(tname: string):Promise<Array<string>> {
        //
        //1. Formulate  the query to get column names of a specific table.
        const sql = `
            SELECT 
                COLUMN_NAME
            FROM 
                information_schema.columns 
            WHERE 
                TABLE_SCHEMA = '${this.source_dbname}' 
                and TABLE_NAME ='${tname}'`;
        //
        //Execute the query and get the results.
        const fuel_cnames:Ifuel= await server.exec(
            'database',
            ['information_schema'],
            'get_sql_data',
            [sql]
        );
        //
        //Extract the column names from results above.
        const column_names:Array<string> = fuel_cnames.map(cname => String(cname.COLUMN_NAME));
        //
        //Return the column names.
        return column_names;
    }
    //
    //Add adtional data to the system after the page has loaded.
    async show_panels(): Promise<void> {}
}