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
//import basic value from schema library.
import * as lib from '../../../schema/v/code/library';
//
export type Ipiq = { piq: string };
//
//Completing level 2  registration of the user.
export class register_intern
    extends outlook.terminal
    implements mod.questionnaire, mod.message, mod.journal {
    //
    //Why declare? To allow us to access the modules currently defined in
    //the main class. NB: Mother is already a property that is of type Page and
    //page does not have the modules.
    declare public mother: main;
    //
    //Create a new class instance
    constructor(mother: main) {
        //
        //Call the super class constructor with the mother page and the file name.
        super(mother, "./html/interns_reg-form.html");
        //        super(mother, "./html/testtable.html");
    }
    get_business(): outlook.business {
        //
        //Use the current logged in user to get the business associated.
        const business = this.mother.user!.business!;
        //
        return { id: business.id, name: this.get_business.name };
    }
    get_content(): { subject: string; body: string; } {
        throw new Error('Method not implemented.');
    }
    get_recipient(): lib.recipient {
        throw new Error('Method not implemented.');
    }
    //
    //This is the business that an intern is registering to.
    get_business_id(): string {
        //
        //Use the current logged in user to get the business associated.
        return this.mother.user!.business!.id;
    }
    //
    //Get the user currently logged in.
    get_user(): string {
        //
        //Get the user from the  logged session.
        const user_name: outlook.user | undefined = this.mother.user;
        //
        //Ensure that the user logged in has a name.
        if (user_name === undefined) throw new schema.mutall_error(`No user found`);
        //
        //Return the user.
        return user_name.name!;
    }
    //
    //This is to post the accountant journal where the fee is 0.
    get_je(): {
        //
        ref_num: string;
        //
        purpose: string;
        //
        date: string;
        //
        amount: number;
    } {
        //
        //1.Collect all the field provided.
        //
        //1.1 Get the reference number.
        //
        //1.2 Get the purpose of the transaction.
        //
        //1.3 Get the date.
        //
        //1.4 Get the amount payed.
        //
        //2. Return the values.
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //Allows one to debit an acccount without having to see whats being done.
    get_debit(): string {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //Allows one to debit an acccount without having to see whats being done.
    get_credit(): string {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //Implement the method required by the questionnaire interface.
    //It returns all the layouts derived from the registration of an intern.
    get_layouts(): Array<quest.layout> {
        //
        // get the user currently logged in.
        const user: Generator<quest.label> = this.user_details();
        //
        //1.Retrieve all label layouts (from the registration form) that are 
        //outside a table.
        const inputs: Generator<quest.layout> = this.get_simple_inputs();
        //
        //2.Retrieve all table based layout from the registration form.
        const tables: Array<quest.layout> = this.get_table_layouts();
        //
        //Return both the inputs and tables.
        return [...user, ...inputs, ...tables];
    }
    //
    //The user name and organization data for the intern registering.
    *user_details(): Generator<quest.label> {
        //
        //Get the user name from the currently logged in user.
        const user_name = this.mother.user!;
        //
        //Generate a label for saving the user name
        yield [app.app.current.dbname, "intern", [], "name", user_name.name];
        //
        //Generate a label for the organization from the business.
        yield [app.app.current.dbname, "organization", [], "id", user_name.business!.id];
    }
    //
    //Retrieves all the label based layouts from the registration form.
    //That are outside of any table. Use the following CSS :-
    //:where(input[type="date"],input[type="text"], input[type="radio"]:checked, select)
    //:not(table *)
    //The input[type="checked"] needs to be treated differently in terms of the alias.
    *get_simple_inputs(): Generator<quest.layout> {
        //
        //1. Get the inputs of type not checkbox.
        yield* this.get_simple_layouts();
        //
        //2. Get the inputs of type checkbox.  
        yield* this.get_checkbox_inputs();
    }
    // 
    // Get the inputs of type checkbox.
    *get_simple_layouts(): Generator<quest.label> {
        //
        //1. Define the css for collecting all inputs that are not in
        // a table.
        const css: string = `:where(input[type="text"],input[type="number"],input[type="date"], input[type="radio"]:checked):not(table *)`;
        //
        //2. Retrieve the inputs and convert them to an array.
        const inputs: Array<HTMLInputElement> = Array.from(document.querySelectorAll(css));
        //
        //3. Loop through all the inputs and yield a label for each of them.
        for (let input of inputs) {
            //
            //3.1. Construct the label of the elements
            //NB: a label is a tuple comprising of 5 elements,
            //viz, dbname, ename, [], cname, basic_value. The basic_value comes from the input.
            const label: quest.label = [
                //
                //The database name
                input.dataset.dbname!,
                //
                //The entity name
                input.dataset.ename!,
                //
                //The alias
                [],
                //
                //The column name
                input.name,
                //
                //The value of the input
                input.value
            ];
            //
            //Yield this label if the value is not empty
            if (input.value !== "") yield label;
        }
    }
    // 
    // Get layouts for selected (multiple)checkboxes.
    *get_checkbox_inputs(): Generator<quest.layout> {
        // 
        // Get all the checkboxes with the specified io-type as a nodelist.
        const checkboxes: NodeListOf<Element> = document.querySelectorAll('[data-io_type]');
        // 
        // Convert the nodelist to an array of elements.
        const elements: Array<Element> = Array.from(checkboxes);
        // 
        // from each element, get the input values and join them as a json.
        for (let io of elements) {
            // 
            // Extract the dataset atrributes required to formulate a label.
            const labels: quest.label = [
                // 
                // Get the database name.
                io.getAttribute('data-dbname')!,
                // 
                // Get the table name.
                io.getAttribute('data-ename')!,
                // 
                // Get the alias(This will be empty as we are saving to the same table.)
                [],
                // 
                // Get the column name
                io.getAttribute('data-cname')!,
                // 
                // Get the input value of the checked checkboxes.
                this.get_value(io)
            ]
            // 
            // Yield the labels.
            yield labels;
        };
    }
    // 
    // Get the value for each (data-io_type) element from the result.
    get_value(io: Element): quest.expression {
        //  
        //Formulate the css to select the checked checkboxes that are within the
        //io.
        const css = `input[type="checkbox"]:checked`;
        // 
        // use the io to get the inputs of type checkbox. And convert to an array
        const inputs: Array<HTMLInputElement> = Array.from(io.querySelectorAll(css));
        // 
        // Map each input value to a string.
        const values = inputs.map(input => input.value);
        //
        //Convert the array of values to a json string.
        return JSON.stringify(values);
    }
    // 
    //Retrieve all table based layouts from the registration form.
    get_table_layouts(): Array<quest.layout> {
        //
        //Collect and return the table layouts.
        return [...this.collect_table_layouts()];
    }
    //
    *collect_table_layouts(): Generator<quest.layout> {
        //
        //1. Get all the table elements in the registration form.
        const table_nodelist = this.document.querySelectorAll("table");
        //
        //2. Convert the nodelist to an array of elements.
        const table_elements = Array.from(table_nodelist);
        //
        //3.Loop through all the table elements and convert 
        //each to a table layout.
        for (let table_element of table_elements) {
            //
            //1. Collect the source table elements.
            yield* this.get_table_layout(table_element);
            //
            //2. Collect destination table elements.
            // console.log(this.get_dest_labels);
            yield* this.get_dest_labels(table_element);
        }
    }
    //
    //Convert the given table element into a questionnaire table.
    //The structure of a questionnaire table is generally defined as:-
    // {class_name, args}
    //in particular its defined as:-
    //{class_name:"fuel", args: [tname, cnames, ifuel] }
    //where:-
    // tname is the name of the table,
    // cnames is an array of column names to be lookedup,
    // ifuel is a double array that represents the table body.
    *get_table_layout(table_element: HTMLTableElement): Generator<quest.table> {
        //
        //A. Define the table that is the source of the data.
        //1.Get the tables class name.
        const class_name = "mutall\\capture\\fuel";
        //
        //2. Get the required arguments, i.e., tname, cnames, ifuel
        //
        //2.1 Get the table name. It is the id of the table element
        const tname = table_element.id;
        //
        //2.2 Get the column names of the table. They will be as many 
        //columns as there are th elements.
        const cnames: Array<string> = this.get_column_names(table_element);
        //
        //2.3 Get the body of the table as double list of string values.
        const body: Array<Array<lib.basic_value>> = this.get_body_values(table_element);
        //
        //3. Compile the table layout.(Data source).
        const table_layout: quest.table = { class_name, args: [tname, cnames, body] };
        //
        //4. Yield the table layouts.
        yield table_layout;
    }
    //
    *get_dest_labels(table_element: HTMLTableElement): Generator<quest.label> {
        //
        //Get the name of the table.
        const tname: string = table_element.id;
        //
        //Get the thead element to access the data saving metadata, e.g dbname,
        //ename, e.t.c.
        const headers = table_element.querySelectorAll('th');
        //
        //Convert the headers to an array.
        const ths = Array.from(headers);
        //
        //For each header yield a label. The components of a label must be 
        //available as the were checked on the previous step.
        for (let th of ths) {
            //
            //Construct the label.
            const label: quest.label = [
                //
                //1. Get the dbname.
                th.dataset.dbname!,
                //
                //2. Get the ename.
                th.dataset.ename!,
                //
                //3. Get the alias and always use the table name as the alias.
                [tname],
                //
                //4. Get the column name.
                th.dataset.cname!,
                //
                //5. Get the expression.
                this.get_expression(tname, th)
            ];
            yield label;
        }
    }
    //
    //Get the expression associated with the given header.It is a lookup
    //expression with two arguements.
    //- the name of the table to look up
    //- the column name to use for the lookup.
    get_expression(tname: string, th: HTMLTableCellElement): quest.expression {
        //
        //1. The full name of the function corresponds to the php class lookup
        //in the capture namespace.
        const fname = "mutall\\capture\\lookup";
        //
        //2. The name of the source table.
        //
        //3. The cname is the column of the table where the data is coming from.
        const cname = th.dataset.cname;
        //
        return [fname, tname, cname];
    }
    //
    //Get the column names.
    get_column_names(table_element: HTMLTableElement): Array<string> {
        //
        //Set the table name.
        const tname = table_element.id;
        //
        //1. Get all the table columns as a collection of TableCellElement.
        const elements = table_element.querySelectorAll("th");
        //
        //Check the nodelist to ensure the table has columns.
        if (elements === null) throw new schema.mutall_error(`There are no columns in this table ${tname}`);
        //
        //Convert the collection to an array.
        const cells = Array.from(elements);
        //
        //Map the array of table cell elements to column names.
        const names = cells.map(cell => {
            //
            //Get the name from the cname datalist.
            const name = cell.dataset.cname;
            //
            //Check to ensure that all the tables have column names.
            if (name === undefined) throw new schema.mutall_error(`No name found for this column in table ${tname}`)
            //
            //Return the name.
            return name;
        });
        //
        //Return the column.
        return names;
    }
    //
    //Compile the body rows and columns
    get_body_values(table_element: HTMLTableElement): Array<Array<lib.basic_value>> {
        //
        //1. Get the input values of the table fields.
        //
        //Get the table body element.
        const tbody: HTMLTableSectionElement | null = table_element.querySelector("tbody");
        //
        //If the tbody is null, throw a new exception.
        if (tbody === null) throw new schema.mutall_error(`Table is empty`);
        //
        //Get the table rows.And 
        const row_list: NodeListOf<HTMLTableRowElement> = tbody!.querySelectorAll("tr");
        //
        //convert the nodelist to an array
        const rows: Array<HTMLTableRowElement> = Array.from(row_list);
        // 
        //2. Get the td's of all the rows and map them to the input value
        const values: Array<Array<lib.basic_value>> = rows.map(row => {
            //Get the inputs in the row. And convert to an array.
            const inputs: Array<HTMLInputElement> = Array.from(row.querySelectorAll("input"));
            //
            //Map every value to a td.(use a yield method)
            const td_values: Array<lib.basic_value> = inputs.map(cell => {
                //Get the value of the td. As an array
                const td_val: lib.basic_value = this.convert_to_basic(cell.value);
                //
                //Return the td.
                return td_val;
            });
            //
            //Return the array of string of td.
            return td_values;
        });
        //
        //Return the body value.
        return values;
    }
    //
    //Check the basic value to get the data types of the values collected.
    //-empty | undefined return null
    //number return number use"parseFloat"
    //otherwise return a string.
    convert_to_basic(value: string): lib.basic_value {
        //
        //Convert empty | undefined to return null
        if (value === "" || value === undefined) return null;
        //
        //Convert value to return a number
        if (parseFloat(value) !== NaN) return value;
        //
        //Convert value to boolean.
        if (value === "true") return true; else if (value === "false") return false;
        //
        //Otherwise return a string.
        return value;
    }
    //
    //check the entered data and if correct return true else return false.
    //And prevents one from leaving the page.
    async check(): Promise<boolean> {
        //
        //0.Clear all the previous checks. Collect all error and warnings and clear.
        //
        //1. Collect and check all the data entered by the user.
        //
        //1.1 Get all the simple inputs and check.
        const inputs = this.check_simple_inputs();
        //
        //1.2 Get all the tables in the form.
        const tables = this.check_table();
        //
        if (!(inputs && tables)) throw new schema.mutall_error(`There are inputs errors in${inputs} and table inputs${tables}`);
        //
        //2. Write the data to the database.
        const save = await this.mother.writer.save(this);
        if (!save) throw new schema.mutall_error(`Saving failed`);
        // //
        // // Registration has charges whis is equal to 0.
        // const post = await this.mother.accountant.post(this);
        // //
        // // send a message to the user.
        // const send = await this.mother.messenger.send(this);
        //
        //Return true.
        return save;
    }
    //
    //Check all the inputs of the tables,
    check_table(): boolean {
        //
        //1 Define the css required  for retrieving the tables inputs
        const css: string = `
            :where(input[type="text"], 
                input[type="date"], 
                input[type="radio"]:checked, 
                input[type="checkbox"]:checked
            :checked):not(:not(table *))`;
        //
        //2. Retrieve the tables inputs and convert then to an array
        const inputs: Array<HTMLInputElement> = Array.from(document.querySelectorAll(css));
        //
        //3.Loop through all the inputs and yield a label for each of them
        for (let input of inputs) {
            //
            //Check if the input has a required property and highlight it as an error
            if (input.required && input.value === "")
                throw new schema.mutall_error(`The value for input ${input.name} is missing
                and it is required`);
            //
            //Check whether an input is not required and if it is not provided,
            //show a warning
            if (!(input.required) && input.value === "") input.classList.add(".warning");
        }
        return true;
    }
    //
    //Check the simple inputs
    check_simple_inputs(): boolean {
        //
        //1 Define the css required  for retrieving the inputs
        const css: string = `
            :where(input[type="text"], 
                input[type="date"], 
                input[type="radio"]:checked
            :checked):not(table *)`;
        //
        //2. Retrieve the inputs and convert then to an array
        const inputs: Array<HTMLInputElement> = Array.from(document.querySelectorAll(css));
        //
        //3.Loop through all the inputs and yield a label for each of them
        for (let input of inputs) {
            //
            //Check if the input has a required property and if not highlight it as an error
            if (input.required && input.value === "")
                throw new schema.mutall_error(`The value for input ${input.name} is missing
                and it is required`);
            //
            //Check whether an input is not required and if it is not provided,
            //show a warning
            if (!(input.required) && input.value === "") input.classList.add(".warning");
        }
        return true;
    }
    //
    //Add additional data after the page has loaded if necessary otherwise do nothing
    async show_panels(): Promise<void> {
        //
        //Get the div tag housing the input node that lets a user select an image.
        const div = this.get_element('sample') as HTMLDivElement;
        //
        //Get the input node that helps a user select an image.
        const input = document.querySelector('div#sample > label > input') as HTMLInputElement;
        //
        input.addEventListener('change', async () => {
            //
            //Get the image file.
            const image = input.files![0];
            //
            //Package the data for sending to the server.
            let form_data = new FormData();
            form_data.append("content", image);
            //
            //Upload the data to server and bring back the image path.
            fetch(`http://206.189.207.206/tracker/v/code/server/test.php`,
                { method: "POST", body: form_data })
                //
                //Handle the server results. 
                .then((response) => {
                    //
                    //Ensure the fetch method executed successfully.
                    if (response.ok) {
                        response.json().then((response_data) => {
                            //
                            //Ensure the server execute positively.
                            if (response_data.ok === true) {
                                //
                                //Get the image path.
                                const path = response_data.data;
                                //
                                //Get the image node, on which to specify a src path to load image.
                                const img = div.lastElementChild;
                                //
                                //Load the image path on the image node.
                                img!.setAttribute('src', path);
                            }
                        });
                    }
                })
        });
    }
}