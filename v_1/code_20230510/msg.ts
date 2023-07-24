//
import * as outlook from '../../../outlook/v/code/outlook.js'
//
//Resolve the modules.
import * as mod from '../../../outlook/v/code/module.js';
//
//Import layout from the schema library.
import * as quest from  '../../../schema/v/code/questionnaire.js';
//
//
import * as server from '../../../schema/v/code/server.js';
//
import * as schema from '../../../schema/v/code/schema.js';
//
//Import event class.
import {event_planner} from './event_planner.js'
//
//Import class main.
import main from './main.js';
import { recipient } from '../../../schema/v/code/library.js';
//
//Expoert the msg interface.
export type Imsg = {msg:string};
//
//This class allows us to write a message to the database and send it.
export class new_message
    //
    //A special quiz class that returns a result that is either true or undefined
    //depending on whether the operation was succesful or not.
    extends outlook.terminal
    implements 
        //
        //This interface allows this page to send the message to users of the
        // current business.
        mod.message,
        //
        //This interface allows this page to write the message to the database.
        mod.questionnaire
 {
    //
    //Why declare? To allow us to access the modules currently defined in
    //the main class. NB: Mother is already a property that is of type Page and
    //page does not have the modules.
    declare public mother:main;
    //
    //The database to save to.
    public dbname = "mutall_users";
    //
    //The language of the message.
    public language?:string;
    //
    //The message to send.
    public message?:string;
    //
    //The event associated with the message.
    public event_name?:string;
    //
    //The date the message is sent.
    public date?:string;
    //
    //The subject of the message.
    public subject?: string;
    //
    //The planner class is used to create an event.
    public planner?: event_planner;
    //
    //The business that the user is logged in to.
    public organization?: string;
    //
    //
    public recipient?:recipient;
    //
    //Create a new instance of the message class.
    constructor(mother: main) {
        //
        //1. Call the constructor of the parent class with the mother page and file name.
        super(mother, "./html/create_message.html");
    }
    get_business(): outlook.business {
        //
        //Get the business of the currently logged in user.
        const business = this.mother.user!.business!;
        //
        return {id:business.id, name:business.name};
    }
    //
    //Get the content of the message.
    get_content(): { subject: string; body: string; } {
        throw new Error('Method not implemented.');
    }
    //
    //Get the receiver of the message. Its either :-
    // - a group or 
    // - an individual.
    get_recipient(): recipient {
        //
		//Get the type of recipient
		const type: string = this.get_checked_value("recipient");
		//
		//Get the business
		const business: outlook.business = this.mother.user!.business!;
		//
		//Get the user added to the list of chosen recipients
		//
		//Get the chosen recipients panel
		const panel = <HTMLDivElement>this.get_element("chosen");
		//
		//Get all selected inputs of type checkbox
		const values = Array.from(panel.querySelectorAll('input[type="checkbox"]'));
		//
		//Retrieve the user primary key as the value from the selected elements
		const user: Array<string> = values.map(pk => (<HTMLInputElement>pk).value);
		//
		//
		return type === "group"
			? { type: "group", business }
			: { type: "individual", user: user };
    }  
    //
    //Collect as many labels as there are properties for saving.
    get_layouts(): Array<quest.layout> {
        //
        //5. Return the layout.
        return Array.from(this.collect_msg());
    }
    *collect_msg(): Generator<quest.layout> {
        //
        //1. Get the language.
        yield[this.dbname, "msg", [], "language", this.language!];
        //
        //2. Get the message.
        yield[this.dbname, "msg", [], "text", this.message!]
        //
        //3. Get the subject.
        yield[this.dbname, "msg", [], "subject", this.subject!];
        //
        //4. Get the date.
        yield[this.dbname, "msg", [], "date", this.date!]
        //
        //5. Get the organization.
        yield[this.dbname, "business", [], "id", this.organization!];
        //
		//Get the user creating the message
		yield [this.dbname, "user", [], "name", this.mother.user!.name!];
        //
        //6. Get the event if any.
        if (this.planner !== undefined)
			yield [this.dbname, "event", [], "name", this.planner.event_name!];
	
    }
    //
    //In future, check if a file json containing iquestionare is selected??
    //
    //Collect and check the data entered by the user sending the message,
    //then write to the data database where appropriate and send the message.
   async check(): Promise<boolean> {
        //
        //1. Collect and check the data that the user has entered.
        //
		//1. Collect and check the data that the user has entered.
		//
		//1.1. Collect and check the recipient
		this.recipient = this.get_recipient();
        //
        //1.1 Collect the language if necessary.
        if(this.language_exists())
            this.language = this.get_selected_value('language');
        //
        //1.2 Collect the message
        this.message = this.get_input_value("msg");
        //
        //1.3 Collect the subject
        this.subject = this.get_input_value("subject");
        //
        //1.4 Collect the date in the mysql format.(not from the input)
        this.date = this.get_input_value('date');
        //
        //1.5 Collect the organization.
        this.organization = this.get_business_id();
        //
        //1.6 Collect the event if any. This must already have been done during
        //event admistration so its not necessary.
        //
        //2. Save the data to the database.
        const save = await this.mother.writer.save(this);
        //
        //Abort this process if the message was not saved succesfully.
        if(!save) return false;
        //
        //3. Send the message text to the users of the business that the 
        //current user belongs to.
        return await this.mother.messenger.send(this);
    }
    //
    //Get the current logged in user and extract the id 
    // from the business component.
    get_business_id(): string{
        //
        //Get the business component in the current logged in user.
        const business = this.mother.user!.business!;
        //
        return business.id;
    }
    //
    //Add additional data to the page after it has loaded.
    async show_panels(): Promise<void> {
        //
        //1. Fill the language selector if necessar.
        if(this.language_exists()) {
            //
            //1. Show the language.
            //
            //2.Populate the selector.
            this.fill_selector("msg","mutall_users", "language");
        } else{
            //
            //hide the language label.
        }
        //
        //2. Initialize the date field with todays date.
        //
        //2.1 Get the date input.
        const input = this.get_element('date');
        //
        //2.1.1 Ensure that the input is a HTMLInputElement.
        if(!(input instanceof HTMLInputElement)) 
            throw new schema.mutall_error(`The element identified by '${input}' is not a HTMLInputElement`);
        //
        //2.2 Append the date to the Input.
        input.valueAsDate = new Date();
        //
        //Create an onclick listener on the technology checkboxes.
        //
        // 1. Get the technology inputs.
        const technology = this.get_element('tech');
        //
        // 2. Add the event listener.
        technology.onclick = async (evt) => await this.tech_info(evt);
        //
        // Add a listener to the create event button.
        const create = this.get_element('create_event');
        //
        //create the event using an onclick event.
        create.onclick = async () => await this.create_event();

    }
    //
    //Calculate the amount for sending an sms or email or both. And display 
    //alongside the checkbox.
    async tech_info(evt:Event) {
        //
        //Get the checked checkbox.???
        const input = evt.target;
        //
        //Calculate the amount for sending the sms to users of either type 
        //individual or group..
        //
        //Get the users count.
        const users:number = await this.get_users_count(this.recipient!.type);
        //
        //Switch statement.
        switch (this.recipient!.type) {
            //
            //
            //Get the options and calculate the amount for the selected mode.
            //for twilio the charge is 10 ksh per sms. mobitech the charge is 0.35 per sms
            //emails we display the number of users the message will reach.
            case 'individual':
                //
                //The twilio message mode.(The cost per sms is Ksh 10).
                if(input.checked === 'twilio'){
                    //
                    //Get the total cost.
                    const amount = users * 10;
                    //
                    //Create a span tag and add the amount as text alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${amount}.`});
                }
                //
                //The mobitech mode(The cost per sms is Ksh 0.35).
                if(input.value === 'mobitech'){
                    //
                    //Get the users total cost.
                    const amount = users * 0.35;
                    //
                    //Create a span tag and add the amount as text alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${amount}.`});
                }
                //
                //The email mode.(The cost is Ksh 0, we need to show the count of users receiving the message.)
                if(input.value === 'email'){
                    //
                    //Create a span tag and add number of users alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${users}.`}); 
                }
                break;
            case 'group':
                //
                //Loop through all the messaging modes.
                //
                //The twilio message mode.(The cost per sms is Ksh 10).
                if(input.value === 'twilio'){
                    //
                    //Get the total cost.
                    const amount = users * 10;
                    //
                    //Create a span tag and add the amount as text alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${amount}.`});
                }
                //
                //The mobitech mode(The cost per sms is Ksh 0.35).
                if(input.value === 'mobitech'){
                    //
                    //Get the users total cost.
                    const amount = users * 0.35;
                    //
                    //Create a span tag and add the amount as text alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${amount}.`});
                }
                //
                //The email mode.(The cost is Ksh 0, we need to show the count of users receiving the message.)
                if(input.value === 'email'){
                    //
                    //Create a span tag and add number of users alongside the checked checkbox.
                    this.create_element('span', input, {textContent: `The cost to send the sms is ksh.${users}.`}); 
                }
                
                break;
            default:
                break;
        }       
    }
    //
    async get_users_count(type: string): Promise<number> {
        //
        //Get the users if the type is individual.
        if(type === 'individual'){
            //
            //Create a condition to fit the case.???
            const condition = `user.name like (${this.recipient!})`;
            //
            // Get the number of users in the business.
            const sql = `
                with
                #
                #Get the primary phone number of each user
                mobile as(
                    select
                        concat(mobile.prefix,mobile.num) as num,
                        row_number() over(partition by mobile.user) as users
                    from mobile
                        inner join user on mobile.user= user.user
                        inner join member on member.user= user.user 
                    where ${condition}
                )
                #
                #Select all users with phone numbers linked to a business
                select * from mobile where users=1
            `;
            //
            //Execute the sql.
            const values = await server.exec(
                "database",
                ['mutall_users'],
                'get_sql_data',
                [sql]
            );
            //
            //Get the number ofvalues in the array.
            const count = values.length;
            //
            return count;
        }else{
            //
            //The condition for a group.
            const condition = `business.id = '${this.mother.user!.business!.id}'`;
            //
            // Get the number of users in the business.
            const sql = `
                with
                #
                #Get the primary phone number of each user
                mobile as(
                    select
                        concat(mobile.prefix,mobile.num) as num,
                        row_number() over(partition by mobile.user) as users
                    from mobile
                        inner join user on mobile.user= user.user
                        inner join member on member.user= user.user 
                    where ${condition}
                )
                #
                #Select all users with phone numbers linked to a business
                select * from mobile where users=1
            `;
            //
            //Execute the sql.
            const values = await server.exec(
                "database",
                ['mutall_users'],
                'get_sql_data',
                [sql]
            );
            //
            //Get the number ofvalues in the array.
            const count = values.length;
            //
            return count;
        }
    }
    //
    //Check the language.
    language_exists(): boolean {
        //
        return false;
    }
    //
    //Create an event.
    async create_event(): Promise<void>{
        //
        //Create a new instance of the event.
        const planner = new event_planner(this.mother);
        //
        //administer the class and return the result.
        const result = await planner.administer();
        //
        //Check if the event was created or not. If not abort this process.
        if(result === undefined) return;
        //
        //If the event was created, get the name of the event from the planner and
        //save it.
        this.event_name = planner.event_name;
    }
 }