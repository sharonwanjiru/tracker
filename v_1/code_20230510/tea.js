//Import app from the outlook library.
//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import schema.
import * as schema from '../../../schema/v/code/schema.js';
export class tea_delivery extends outlook.terminal {
    //
    //Reference number
    ref_num;
    //
    //Merchant name.
    merchant;
    //
    //The purpose.
    purpose;
    //
    //Date of transaction.
    date;
    //
    //The amount paid.
    amount;
    //
    //Create a new instance of tea_delivery class.
    constructor(mother) {
        //
        //Call the constructor of the parent class with the mother page and file name. 
        super(mother, './html/tea_delivery.html');
    }
    //
    //
    get_business_id() {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //Collect all the required details to post the details into the journal.
    get_je() {
        //
        //. Return the values.
        return {
            ref_num: this.ref_num,
            purpose: this.purpose,
            date: this.date,
            amount: this.amount,
        };
    }
    //
    //The account to debit the transactiom.
    get_debit() {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //The account the transaction.
    get_credit() {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    async check() {
        //
        //1.Collect and check all the fields provided.
        //
        //1.1 Get the reference number.
        this.ref_num = this.get_input_value('ref_num');
        //
        //1.2 Get the purpose of the transaction.
        this.purpose = this.get_input_value('purpose');
        //
        //1.3 Get the date.
        this.date = this.get_input_value('date');
        //
        //1.4 Get the amount payed.
        this.amount = parseFloat(this.get_input_value('amount'));
        //
        //2. Post to the accounts module.
        const post = await this.mother.accountant.post(this);
        //
        //At this point if an error occurs during posting, its handled at the module level
        //See the implmentation in the module class.
        return post;
    }
    //
    //Collect data to show whether we should update the home page or not.
    async get_result() { return true; }
    //
    //Add an event listener to the ok button.
    async show_panels() {
        //
        //1.Populate the merchants selector.
        this.fill_selector("account", "mutall_users", "merchant");
        //
        //2. Set the date to the current date and time.
        const date = this.get_element('date');
        date.valueAsDate = new Date();
        //
        //
    }
}
//
//Tea payment 
export class pay_tea extends outlook.popup {
    //
    //
    constructor() {
        super('./html/pay_tea.html');
    }
    //
    //Collect data to show show if we should update the homepage or not.
    async check() { return true; }
    ;
    //
    //Collect data to show whether we should update the home page or not.
    async get_result() { }
    //
    //Add an event listener to the ok button.
    async show_panels() {
        //
        //Get the ok button
        const save = this.get_element("go");
        //
        //Add an event listener to the ok button.
        save.onclick = async () => this.pay_tea();
    }
    pay_tea() {
        //
        alert('Success');
    }
}
