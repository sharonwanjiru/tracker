//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from "../../../outlook/v/code/app.js";
//
export class post_ledgers extends outlook.terminal {
    //
    ref_num;
    purpose;
    date;
    amount;
    //
    constructor(mother) {
        //
        super(mother, 'post.html');
    }
    //
    //Get the business.
    get_business_id() {
        return "mutall_data";
    }
    //
    //Get the transaction records.
    get_je() {
        //
        //The reference of the transaction.
        const ref_num = this.ref_num;
        //
        //The reason of the transaction.
        const purpose = this.purpose;
        //
        //The date of the transaction occurence.
        const date = this.date;
        //
        //The amount transacted.
        const amount = this.amount;
        //
        //Return the journal entries.
        return { ref_num: ref_num, purpose: purpose, date: date, amount: amount };
    }
    //
    //Get the account to credit the amount.
    get_debit() {
        return "mutall_rental";
    }
    //
    //Get the account to sredit the amount.
    get_credit() {
        return "expenses";
    }
    //
    async check() {
        //
        //Collect and check the reference from the template.
        this.ref_num = this.get_input_value('ref_num');
        //
        //Collect and check the purpose.
        this.purpose = this.get_input_value('purpose');
        //
        //Collect the date.
        this.date = this.get_input_value('date');
        //
        //Collect the amount.
        this.amount = parseFloat(this.get_input_value('amount'));
        //
        //Post the transaction.
        const post = await app.app.current.accountant.post(this);
        //
        //Check if the posting was successful.
        if (post === false)
            alert `The data wasnt posted.`;
        //
        return post;
    }
    //
    //Add additional info after the page has loaded.
    async show_panels() {
        //
        //Set the date component.
        const date = this.get_element('date');
        date.valueAsDate = new Date;
    }
}
