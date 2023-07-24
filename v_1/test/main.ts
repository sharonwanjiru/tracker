//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from "../../../outlook/v/code/app.js";
//
import * as mod from '../../../outlook/v/code/module.js';
//
import * as load from './load.js';
//
import * as ledge from './post_ledgers.js';
//
import * as quest from '../../../schema/v/code/questionnaire.js';
//
import * as lib from '../../../schema/v/code/library.js';
//
import * as schema from '../../../schema/v/code/schema.js';
//
import * as rent from './rental_data.js';
//
//System for daily management of organization activities.
export default class main extends app.app {
    //
    //Initialize the main application.
    constructor(config: app.Iconfig) {
        super(config);
    }
    //
    //Retuns all the inbuilt products that are specific to
    //thus application
    get_products_specific(): Array<outlook.assets.uproduct> {
        return [
            {
                title: "Services",
                id: "definers",
                solutions: [
                    {
                        title: "Load_table",
                        id: "load_table",
                        listener: ["event", ()=> this.load_table_data()]
                    },
                    {
                        title: "Post ledger",
                        id: "post_ledger",
                        listener: ["event", ()=> this.post_ledger()]
                    },
                    {
                        title: "Schedule Non-rep",
                        id:"non_rep",
                        listener:["event", ()=> this.non_repetitive()]
                    },
                    {
                        title: "Initiate Email",
                        id: "send_email",
                        listener: ["event", ()=> this.initiate_email()]
                    },
                    {
                        title: "Cancel Email",
                        id: "cancel_mail",
                        listener: ["event", ()=> this.cancel_email()]
                    }
                ]
            },
            {
                title: "Send actions",
                id: "send_actions",
                solutions: [
                    {
                        title: "send sms",
                        id: "send_sms",
                        listener: ["event", ()=> this.send_sms()]
                    }
                ]
            },
            {
                title:"Rental data",
                id: "rental_data",
                solutions: [
                    {
                        title: "rental",
                        id: "rental",
                        listener: ["event", ()=> this.rentals_data()]
                    }
                ]
            }
        ];
    }
    //
    //Facilitates the transefer of the rental data once added to the database 
    //in mutallco to mutall do.
    async rentals_data(): Promise<void>{
        //
        const rental = new rent.rental_data(this);
        //
        await rental.administer();
    }
    //
    //Initiate the process of sending an  appropriate email to
    //pm as soon as camilus has posted the invoices on mutallco.
    async initiate_email(): Promise<void> {
        //
        // 1. Create the job to schedule.
        const Job: job = new job();
        //
        // 2. Save the job to the database.
        const save:boolean = await this.writer.save(Job);
        // 
        // Ensure the job is saved.
        if(!save) throw new schema.mutall_error(`The job failed to save.`);
        // 
        // 3. Rebuild  the crontab afresh to include the job.
        const success:boolean = await this.scheduler.execute(Job);
        //
        //Ensure the job was scheduled successfully.
        if(!success) throw new schema.mutall_error(`The job was not scheduled`);
        //
        //At this point the process was succesful.
        alert("Okay");
    }
    //
    //Cancel the email recieving process that was initiated earlier.
    async cancel_email():Promise<void>{
        //
        //Stop all scheduled at command currently scheduled.
        //
        // Get the performance and mark as cancelled.
        // 
        // Refresh the crontab.
        //
        // Refresh at commands.
        //
        // Report when the performance is canceled.
        //
        // 1. Get the job previously created.
        const data:job = new job();
        // 
        // 2. Update its end-date to be a value less than today.
        await this.writer.save(data);
        // 
        // 3. Rebuild the crontab to exclude the job.
        await this.scheduler.execute(data);
    }
    //
    //Test for scheduling a non repetitive task using the linux 'at' command.
    async non_repetitive(): Promise<void> {
        //
        //Formulate the test data that is an implementation of crontab required 
        //by the scheduler module.
        const test_data:mod.crontab = {
            //
            //We dont intend to create a new crontab because this is a 
            //non repetitive task.
            refresh_crontab(): boolean{return false;},
            //
            //Formulate only one at command to test.
            get_at_commands(): Array<lib.at>{
                //
                return[{
                    //
                    //This is not a predefined command.
                    type:"other",
                    //
                    //This has to be a date in the future.
                    datetime:"2022-09-24 12:00",
                    //
                    command:"ls -a"
                }];
            },
            get_job_name() {
                //
                return "NonRepetitive";
            },
        }
        // 
        // Execute the at command and handle any erronious situation.
        const success:boolean = await this.scheduler.execute(test_data);
        if(success)alert('Ok');else alert('failed');
    }
    // 
    // Test sms sending
    async send_sms(): Promise<void> {
        //
        //Create the message to send.
        const sms:mod.message = {
            //
            //Get the business for which to send the message if the user is of type group.
            //and the primary key if the user is of type individual.
            get_business(): outlook.business {
                //
                return {id:"mutall_data", name: "CSR Program of Mutall Investiment Company"};
            },
            //
            //Get the subject and the body of the message as content.
            get_content(): { subject: string; body: string; } {
                //
                return {subject: "Hey Welcome", body: "Sms test for individual message mutall data is a sucess."};
            },
            //
            //The receiver of the message.
            get_recipient(): lib.recipient {
                //
                return {type: "individual", user:["1271"]};
                // return {type: "group", business: this.get_business()};
            }
        };
        //
        //Send the message.
        const mess:boolean = await this.messenger.send(sms);
        //
        if(mess) alert('sms sent succesfully'); 
        else alert("Sms was not sent successsfuly");
    }
    //
    //Test whether you can post a ledger successfully. This shall be 
    //done as follows :-
    // -*1. populate the accounts table with tracker chart of accounts.
    // -2. create a test journal.
    // -3. post the journal.
    // -*4. check the database to see whether the je, debit, credit are saved
    async post_ledger(): Promise<void> {
        //
        //Create an instance of the class.
        const ledger = new ledge.post_ledgers(this);
        //
        //Call crud page and close when done.
        const result = await ledger.administer();
        //
        //check the validity of the data.
        if (result === undefined) return; 
    }
    //
    //Load the first table of mutallco_rental.
    async load_table_data(): Promise<void> {
         //
        //Create an instance of the class.
        const table_load = new load.load_tables(this);
        //
        //Call crud page and close when done.
        const result = await table_load.administer();
        //
        //check the validity of the data.
        if (result === undefined) return;
    }
}
// 
// Cancel the email being sent.
class email_cancel implements mod.questionnaire{
    // 
    // Get the layouts for saving
    get_layouts(): quest.layout[] {
        // 
        return [...this.job_layouts()]
    }
        //
    //Get the layouts for the job.
    *job_layouts(): Generator<quest.label> {
        //
        // The recursion
        const recursion= {repetitive: "yes",  startdate: "2022-08-26 12:00", end_date:"2022-08-15 12:00", frequency:"* * 5 * *"};
        //
        yield ["mutall_users", "activity", [], "name", "Performance"];
        //
        yield ["mutall_users", "activity", [], "msg", "Invoices created"];
        //
        yield ["mutall_users", "activity", [], "recursion", JSON.stringify(recursion)];
    }
    //
    get_job_name(): string {
        //
        return 'Performance';
    }
    
}
//
//Send an email to Mr muraya when the invoices are sent to the clients.
class job implements mod.questionnaire, mod.crontab {
    //
    public recursion ={
        //
        //This is a repetitive function as opposed to a one off operation.
        repetitive: "yes", 
        //
        //The start date is today to enforce the job to be added to the 
        //crontab immediately. 
        startdate: Date(), 
        //
        //This process will run forever.
        end_date:"9999-12-31",
        //
        // Send the email on the fifth day of every month.???This is not the 
        //intention.
        frequency:"* * 1 * *"
    };
    //
    //The command to run.
    public command = 'poll_invoice.php';
    //
    //The jon name.
    public name = 'performance';
    //
    //
    constructor(){}
    //
    //Return the layouts of this job as required by the questionnaire interface.    
    get_layouts(): Array<quest.layout> {
        //
        //The database name.
        const dbname = 'mutall_users';
        //
        //The table name.
        const ename = 'activity';
        //
        //Collect and return the layouts needed for writing this job to the 
        //database.
        return [
            //
            // The job identifier.(numeric is not the best identifier)
            [dbname, ename, [], "name", this.name],
            //
            //The command to execute is to check the mutallco for evidence that 
            // invoices have been posted.
            [dbname,ename, [], "command", this.command],
            //
            //This is the message to be sent.
            [dbname, ename, [], "msg", "Invoices for the current month are created"],
            //
            //The frequency of which this message will be sent.
            [dbname, ename, [], "recursion", JSON.stringify(this.recursion)]
        ];
    }
    //
    //Force the creation of a new crontab.
    refresh_crontab(): boolean {
        //
        //Use the job dates to determine if we need a new crontab.
        if(!(this.recursion.end_date > Date())){
            return false;
        }
        return true;
    }
    // 
    // Get the at commands for scheduling the task.
    get_at_commands(): Array<lib.at> {
        //
        //Derive the at command from the job.
        const command:Array<lib.at> = [
            {
                type:'other', 
                datetime: this.recursion.startdate, 
                command: this.command
            }
        ];
        //
        //return the at command;
        return command;
    }
    //
    // Get the name of the job.
    get_job_name(): string {
        //
        //Derive the job name from the job.
        return this.name;
    }
}
