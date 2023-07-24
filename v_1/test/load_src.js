//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Load table data from one database to another.
export class load_tables extends outlook.terminal {
    //
    //The database to save the data.
    dest_dbname = "rental_";
    //
    //The database to query.
    source_dbname = "mutallco_rental";
    //
    //The table to lookup the data.
    table = "\\mutall\\capture\\lookup";
    //
    //Initiate a new class instance.
    constructor(mother) {
        //
        //Call the super with the mother and html.
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    async check() {
        //
        //Get the table args.
        const layout = await this.get_layouts();
        //
        //Effect the room data transfer.
        const result = await server.exec('questionnaire', [layout], 'load_common', []);
        //
        //Check the result and if there is an error stop and report the error.
        if (result !== 'Ok') {
            //
            //Return false.
            return false;
        }
        //
        return true;
    }
    //
    //Get the layouts of all tables to load the data from one database
    //to another database.(find out from the schema.)
    async get_layouts() {
        //
        //Get the table to load the data from.
        const tname = "agreement";
        //
        //Get the foreign keys of a table.
        const fks = await this.get_foreign(tname);
        //
        //Get the friendly from  the database for these foreign keys.
        const friendly = await this.get_friendly(fks);
        //
        //prefix the foreign keys with the table name which ios the fk name.
        const fk_name = fks.map(fk => fk.concat('.' + fk));
        console.log(fk_name);
        //
        //Get the column names for the agreement table.
        const cnames = await this.get_column_names(tname);
        //
        //Use the table names to formulate a double array of layouts for each table.
        const cname = cnames.join(', ');
        //
        //Get the source of the data as a table object.
        const source = {
            //
            //The type of table to generate, derived from a query.
            class_name: "capture\\query",
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
        };
        //Get the destination of you data as an array of labels.???
        const dest = 
        // [
        cnames.map(cname => [this.dest_dbname, tname, [tname], cname, [this.table, tname, cname]]);
        //
        //Get the labels for the foreign keys.
        const dest1 = fks.map(fk => [this.dest_dbname, fk, [tname], fk, [this.table, tname, fk]]);
        //
        //Return the source and destination as an array.
        console.log([source, ...dest, ...dest1]);
        return [source, ...dest, ...dest1];
    }
    //
    //Get  the friendly column names of these foreign keys as they are the table names.
    async get_friendly(fks) {
        //
        //for all fk get the identifier of the table.
        //
        //Concat the table name and the friendly.
        //
        //return the value.
    }
    //
    //Get the foreign key of the agreement table.
    async get_foreign(tname) {
        //
        //Formulate the query
        const sql = `
            SELECT 
                FOR_COL_NAME as name 
            FROM 
                INNODB_FOREIGN_COLS  
            where 
                ID like 'mutall_rental/${tname}%'
        `;
        //
        //Execute the query and return the result.
        const f_keys = await server.exec('database', ['information_schema'], 'get_sql_data', [sql]);
        //
        //Extract the foreign keys names from the result above.
        const f_key_names = f_keys.map(f_key => String(f_key.name));
        //
        //Return the foreign key names
        return f_key_names;
    }
    //
    //Get the column names of the tables provided.
    async get_column_names(tname) {
        //
        //1. Formulate  the query to get column names of a specific table.
        const sql = `          
            SELECT 
                COLUMN_NAME
            FROM 
            information_schema.columns 
            WHERE 
                TABLE_SCHEMA = 'mutall_rental' 
                and TABLE_NAME ='agreement'
                and COLUMN_NAME 
                    not in (SELECT 
                                FOR_COL_NAME 
                            FROM 
                                INNODB_FOREIGN_COLS  
                            where 
                                ID like 'mutall_rental/${tname}%'
                            )    
        `;
        //
        //Execute the query and get the results.
        const fuel_cnames = await server.exec('database', ['information_schema'], 'get_sql_data', [sql]);
        //
        //Extract the column names from results above. and add the table name before each.
        const column_names = fuel_cnames.map(cname => tname.concat('.' + String(cname.COLUMN_NAME)));
        //
        //Return the column names.
        console.log(column_names);
        return column_names;
    }
    //
    //Add adtional data to the system after the page has loaded.
    async show_panels() { }
}
