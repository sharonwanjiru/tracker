//
//Resolves reference to the asset.products data type
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from '../../../outlook/v/code/app.js';
//
//Import schema from the schema library.
import * as schema from '../../../schema/v/code/schema.js';
//
//Resolve the iquestionnaire
import * as quest from '../../../schema/v/code/questionnaire.js';
//
//Resolve the modules.
import * as mod from '../../../outlook/v/code/module.js';
//
//Import server from the schema library.
import * as server from '../../../schema/v/code/server.js';
//
//import main from tracker
import main from './main.js';
//
//Resolve the piq.
import * as piq from './piq.js';
//
//import basic value from schema library.
import * as lib from '../../../schema/v/code/library';
//
//The structure of data pulled out of a database to fill an intern
//form for editing.
type user_data = {
    //
    //Simple inputs.An ifuel has the following structure:
    //type Ifuel = Array<{[index:string]:basic_value}>
    //e.g. {name:'Francis Nyakundi', email: 'nyakundi@gmail.com'}.
    simple: Array<{index:number, value:string}>,
    //
    //Table inputs.
    tables: Array<{index:number, body:Array<Array<string>>}>,
    //
    //the checkbox values.
    checks: Array<{index:number, value:string}>
};
//
//Get the user data from the database and prefill the PIQ form for editing.
export class edit_my_profile extends piq.register_intern{
    //
    //Create a new class instance
    constructor(mother: main) {
        //
        //Call the super class constructor with the mother page and the file name.
         super(mother);
    }
    //
    //Additional information needed after the page fires.
    async show_panels(): Promise<void> {
        //
        // Get the intern user name from the logged in user.
        const user_name: string = this.mother.user!.name!;
        //
        //Get the intern data from the database.
        const data: user_data = await this.get_intern_data(user_name);
        //
        //Use the data to complete this(PIQ) form.
        this.complete_form(data, 'edit');
    }
    //
    //Use the data to complete this(PIQ) form.
    complete_form(data: any, arg1: string): void {
        //
    }
    //
    //
    //Get the  intern data from the database and display it on the registration form.
    async get_intern_data(user: string):Promise<user_data> {
        //
        //Get the simple inputs
        const simple = await this.simple_inputs(user);
        //
        //Get the table inputs.
        const tables = await this.table_inputs(user);
        //
        //Get the check box inputs.
        const checks = await this.checkbox_data(user);
        //
        //Return the data fror all the.
        return {simple, tables, checks};
    }
    //
    // Get all the user inputs from the database and display them on the registration form.
    async simple_inputs(user: string){
        //
        throw new Error('Method not implemented.');

    }
    //
    // Get the table inputs from the database and display on the tables in the form.
    async table_inputs(user: string) {
        //
        throw new Error('Method not implemented.');
    }
    //
    //Get the checkbox data from the database and display it on the registration form.
    async checkbox_data(user: string){
        //
        // Get the table name associated with the checkboxes.???
        //
        // Get all checkbox elements as a nodelist and convert to an array.
        const checkboxes:Array<Element> = Array.from(document.querySelectorAll('[data-io_type]'));
        //
        // Loop through all the checkboxes and get the table name and cnames.
        const checkbox_values = checkboxes.map(checkbox => {
            //
            //Get the table name.
            checkbox.getAttribute('data-ename');
            //
            //Get the column name.
            checkbox.getAttribute('data-cname');
            //
            //
        });
        //
        // Get the values of the check.
        return checkbox_values;
    }
}