//
//Resolve the piq.
import * as piq from './piq.js';
//
//Get the user data from the database and prefill the PIQ form for editing.
export class edit_my_profile extends piq.register_intern {
    //
    //Create a new class instance
    constructor(mother) {
        //
        //Call the super class constructor with the mother page and the file name.
        super(mother);
    }
    //
    //Additional information needed after the page fires.
    async show_panels() {
        //
        // Get the intern user name from the logged in user.
        const user_name = this.mother.user.name;
        //
        //Get the intern data from the database.
        const data = await this.get_intern_data(user_name);
        //
        //Use the data to complete this(PIQ) form.
        this.complete_form(data, 'edit');
    }
    //
    //Use the data to complete this(PIQ) form.
    complete_form(data, arg1) {
        //
    }
    //
    //
    //Get the  intern data from the database and display it on the registration form.
    async get_intern_data(user) {
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
        return { simple, tables, checks };
    }
    //
    // Get all the user inputs from the database and display them on the registration form.
    async simple_inputs(user) {
        //
        throw new Error('Method not implemented.');
    }
    //
    // Get the table inputs from the database and display on the tables in the form.
    async table_inputs(user) {
        //
        throw new Error('Method not implemented.');
    }
    //
    //Get the checkbox data from the database and display it on the registration form.
    async checkbox_data(user) {
        //
        // Get the table name associated with the checkboxes.???
        //
        // Get all checkbox elements as a nodelist and convert to an array.
        const checkboxes = Array.from(document.querySelectorAll('[data-io_type]'));
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
