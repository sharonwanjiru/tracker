//
//Import app class from outlook library.
import * as outlook from '../../../outlook/v/code/outlook.js';
import * as schema from '../../../schema/v/code/schema.js';
//
//Create an instance of class create_event.
export class event_planner extends outlook.terminal {
    //
    //The name of the event.
    event_name;
    //
    //The description of the event.
    description;
    //
    //The start of the event.
    start_date;
    //
    //The end of the event.
    end_date;
    //
    //The contribution
    contributory;
    //
    //If the contribution is mandatory.
    mandatory;
    //
    //The amount contributed.
    amount;
    //
    //reference of transaction.
    ref_num;
    //
    //Purppose of transaction.
    purpose;
    //
    //The database.
    dbname = "mutall_users";
    //
    //Create an instance of class create_event.
    constructor(mother) {
        //
        super(mother, './html/Event_form.html');
    }
    //
    get_business() {
        throw new Error('Method not implemented.');
    }
    //
    get_content() {
        throw new Error('Method not implemented.');
    }
    //
    get_recipient() {
        throw new Error('Method not implemented.');
    }
    //
    refresh_crontab() {
        throw new Error('Method not implemented.');
    }
    //
    get_at_commands() {
        throw new Error('Method not implemented.');
    }
    //
    get_job_name() {
        throw new Error('Method not implemented.');
    }
    //
    //Get the business id of the user who is currently logged in.
    get_business_id() {
        throw new schema.mutall_error('nothing');
    }
    //
    //Get the journal entry data for double entry.
    get_je() {
        //
        //1.Collect all the field provided.
        this.ref_num = this.get_ref_num();
        //
        //1.2 Get the purpose of the transaction.
        this.purpose = this.event_name;
        //
        //1.3 Get the date.
        const date = this.start_date;
        //
        //1.4 Get the amount payed.
        const amount = this.amount;
        //
        //2. Return the values.
        return { ref_num: this.ref_num, purpose: this.purpose, date: date, amount: amount };
    }
    //
    //Generate the reference number from the event name and the datetime.
    get_ref_num() {
        //
        //Get the event name.
        const name = this.event_name;
        //
        //Get the datetime.
        const date = new Date();
        //
        //Combine the two.
        const ref = `${name}` + `${date}`;
        //
        //return the reference.
        return ref;
    }
    //
    //Get the account to be debited.
    get_debit() {
        throw new Error("Method not implemented.");
    }
    //
    //Get the account to be credited.
    get_credit() {
        throw new Error("Method not implemented.");
    }
    //
    //For error reporting.
    report_error() {
        throw new Error('Method not implemented.');
    }
    //
    // Implement the scheduler for scheduling tasks.
    exec(crj) {
        throw new Error('Method not implemented.');
    }
    //
    //Collect as many labels as there are in the form.
    get_layouts() {
        //
        //Return the event data.
        return Array.from(this.get_event_data());
    }
    *get_event_data() {
        //
        //Get the event name.
        yield [this.dbname, "event", [], "id", this.event_name];
        //
        //Get the description.
        yield [this.dbname, "event", [], "name", this.description];
        //
        //Get the start date and
        yield [this.dbname, "event", [], "start_date", this.start_date];
        //
        //The end date.
        yield [this.dbname, "event", [], "end_date", this.end_date];
        //
        //Get the contributory.
        yield [this.dbname, "event", [], "contributory", this.contributory];
        //
        //get the mandatory only if its contributory.
        if (this.contributory === 'yes') {
            //
            //Get the mandatory.
            yield [this.dbname, "event", [], "mandatory", this.mandatory];
            //
            //Get the amount only if the mandatory value is yes
            if (this.mandatory === 'yes') {
                //
                //Get the amount
                yield [this.dbname, "event", [], "amount", this.amount];
            }
        }
    }
    //
    //Collect and check the data that the user has entered.
    async check() {
        //
        //1. Collect and check the data that the user has entered.
        //
        //Collect the event name.
        this.event_name = this.get_input_value('name');
        //
        //Collect the description.
        this.description = this.get_input_value('description');
        //
        //Collect the start date and 
        this.start_date = this.get_input_value('start_date');
        //
        //Collect end date.
        this.end_date = this.get_input_value('end_date');
        //
        //Collect the contributory.
        this.contributory = this.get_checked_value('contributory');
        //
        //Collect the mandatory only if the contribution value is yes.
        if (this.contributory === 'yes') {
            //
            //Collect the mandatory.
            this.mandatory = this.get_checked_value('mandatory');
            //
            //Collect the amount only if the mandatory value is yes
            if (this.mandatory === 'yes') {
                //
                //Collect the amount
                this.amount = parseFloat(this.get_input_value('amount'));
            }
        }
        //
        //2. Save the data to the database.
        const save = await this.mother.writer.save(this);
        //
        //3. Send the appropriate message to the user(s).
        const send = await this.mother.messenger.send(this);
        //
        //4. Update the accounting book keeping system.
        const post = await this.mother.accountant.post(this);
        //
        //5. Schedule tasks if necessary.
        const exec = await this.mother.scheduler.execute(this);
        //
        //6. Return the result.
        return save && send && post && exec;
    }
    //
    //Get the result and return true if successful.
    async get_result() { return true; }
    //
    //Add additional data to the page after it has loaded. If necessary.
    async show_panels() {
        //
    }
}
