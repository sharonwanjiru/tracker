//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import schema.
import * as schema from '../../../schema/v/code/schema.js';
//
//Reply to the message that is currently selected in
//the message panel of the application.
export class Reply_message extends outlook.terminal {
    //
    //user sending the message.
    user;
    //
    //subject of the message.
    messg = localStorage.getItem('msg');
    //
    mesg = JSON.parse(this.messg);
    //
    //The message.
    message;
    //
    //The business.
    organization;
    //
    //The evnt info.
    contribution;
    //
    //create a new reply message class instance
    constructor(mother) {
        //
        //1. Call the constructor of the parent class with the mother page and file name.
        super(mother, "./html/rep_msg.html");
    }
    get_business() {
        throw new Error('Method not implemented.');
    }
    get_content() {
        throw new Error('Method not implemented.');
    }
    get_recipient() {
        throw new Error('Method not implemented.');
    }
    //
    //Collect all the label layouts from the messaging reply dialogue box.
    get_layouts() {
        //
        //The database name.
        const dbname = "mutall_users";
        //
        //Return the layouts ;
        return Array.from(this.reply_labels(dbname));
    }
    //
    //Formulaye the labels for saving
    *reply_labels(dbname) {
        //
        //0. Get the user
        yield [dbname, "user", [], "name", this.user];
        //
        //1.Get the language.
        yield [dbname, "msg", [], "language", this.mesg.subject];
        //
        //2.Get the message as a label
        yield [dbname, "msg", [], "text", this.message];
        //
        //Get the organization/business related with this message and
        //save to the relevant database, providing all the required
        //information.
        yield [dbname, "business", [], "id", this.organization];
    }
    //
    //Collect and check the repy message data and set the result.
    async check() {
        //
        //1. Collect and check the data that the user has entered.
        //
        //1.0 Collect the user.
        this.user = this.get_user();
        //
        //1.2 Collect and check the message.
        this.message = this.get_input_value("message");
        //
        //1.3 Work on more to see if there is an event related that is contributory.
        //If there is such an event, proceed to identify the event collect the contribution.???
        this.contribution = this.get_contribution();
        //
        //2. Save the data to the database.
        const save = await this.mother.writer.save(this);
        //
        //3. Reply the appropriate message from the user(s).
        const send = await this.mother.messenger.send(this);
        //
        //4. Decide whether the accounting module is neccesary.
        //It is necessary if a contributory event is invoked, call the accountant class
        //to post the.
        if (!(this.contribution === undefined)) {
            //
            //1. Update the book of accounts
            //
            //1.0 Get the event.(Required in a new message)
            //  const evt = this.contribution.event;
            //
            //1.1 Get the amount contributed
            const amount = this.contribution.amount;
            //
            //1.2 Construct a journal from the amount.
            const je = new event_journal(amount);
            //
            //2. Effect the payment.
            //
            //3. Post the journal.
            const post = await this.mother.accountant.post(je);
            //
            //If the posting was successful,
            return post;
        }
        //
        return save && send;
    }
    get_contribution() {
        //
        //Get the event related to this contribution.
        const event = this.contribution.event;
        //
        //Get the amount and return the value.
        const amount = this.get_input_value('amount');
        //
        //Return the amount.
        return { event, amount };
    }
    //
    //Get the user who is currently logged in.
    get_user() {
        //Get the operator from the currently logged in user.
        const user = this.mother.user;
        //
        //Ensure that the user is available
        if (user === undefined)
            throw new schema.mutall_error(`No user found`);
        //
        //Return the user.
        return user.name;
    }
    //
    //Additional information needed after the page fires.
    async show_panels() {
        //
        //1.  Fill the language selector.
        this.fill_selector("msg", "mutall_users", "language");
        //
        //2. Paint the original message on the template.
        //
        //2.2 Get the text area element of where to add the message.
        const text_area = this.get_element("prev_message");
        //
        //2.2 Ensure the element we are painting to is a textarea.
        if (!(text_area instanceof HTMLTextAreaElement))
            throw new schema.mutall_error(`The element identified by prev_message is not a textarea`);
        //
        //Retrieve the message (msg) from the local storage.
        const text_msg = this.mesg.text;
        // var text_msg = localStorage.getItem('msg');
        //
        // 2.3 Put the retrieved message in the text area.???
        text_area.value = text_msg;
        //
        //3. Switch the contribution on and off depending on whether
        //the original message is associated with an event.
        //
    }
}
//
//Make it a part of the registration.
//
//Collect all the information required to post a journal for an event
//contribution.
class event_journal {
    amount;
    //
    ref_num;
    //
    purpose;
    //
    date;
    //
    //construct the class
    constructor(amount) {
        this.amount = amount;
    }
    //
    //Get the business related to the message.
    get_business_id() {
        //
        //Get the business from the currently logged in user.
        return this.mother.user.business.id;
    }
    //
    //Get the journal entries to record the transaction.
    get_je() {
        //
        //1. Get the reference number of the transaction.
        //Generate one using the event name and the date.
        this.ref_num = this.get_ref_num();
        //
        //2. Get the purpose of the transaction.
        this.purpose = this.get_message_subject();
        //
        //3. Get the date of the transaction.
        this.date = this.get_date();
        //
        //4. Get the amount in the transaction.
        this.amount = this.get_amount();
        //
        //Return the values of the collection above.
        return { ref_num: this.ref_num, purpose: this.purpose, date: this.date, amount: parseFloat(this.amount) };
    }
    //
    //Generate a reference number for the event contribution.
    get_ref_num() {
        //
        //Get the event name.
        //
        //Get the date.
        //
        //Use the above two two create a reference number.
        throw new Error('Method not implemented.');
    }
    //
    //Get the subject of the message.
    get_message_subject() {
        //
        throw new Error('Method not implemented.');
    }
    //
    //Get the date from the reply message
    get_date() {
        //
        //Get the current date
        const date = (new Date()).toDateString();
        //
        return date;
    }
    //
    //Get the amount from the reply message
    get_amount() {
        throw new Error('Method not implemented.');
    }
    //
    //Get the account to debit the transaction.
    //Hint: The acccount of the person that the amount is being sent from
    get_debit() {
        //
        //Get the account to debit the amount.
        throw new Error('Method not implemented.');
    }
    //
    //Get the account to credit the transaction.
    get_credit() {
        //
        //Get the account to debit the amount
        throw new Error('Method not implemented.');
    }
}
