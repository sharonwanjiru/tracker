//
//Import outlook from the outlook library.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import app from the outlook library
import * as app from "../../../outlook/v/code/app.js";
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Resolve the modules.
import * as mod from '../../../outlook/v/code/module.js';
//
//Import all the classes for the tracker services.
//
//Resolve the level 2 registration.
import * as piq from "./piq.js";
//
//Import the test msg class.
import * as msg from "./msg.js";
//
//Resolve the svg work.
import * as svg from "./svg.js";
//
//Resolve the reply message.
import * as rep from './reply_msg.js';
//
//Resolve the event planner.
import * as eve from './event_planner.js';
//
//Resolve tea payment and delivery.
import * as tea from './tea.js';
//
//Resolve the website class.
import * as web from './website.js';
//
//Resolve the edit class.
import * as profile from './edit_profile.js';
//
//System for daily management of organization activities.
export default class main extends app.app {
    //
    writer;
    messenger;
    accountant;
    scheduler;
    //
    //The message.
    msg;
    //
    //Initialize the main application.
    constructor(config) {
        super(config);
        //
        //initialize the above 
        this.writer = new mod.writer();
        this.messenger = new mod.messenger();
        this.accountant = new mod.accountant();
        this.scheduler = new mod.scheduler();
    }
    //
    //
    //Retuns all the inbuilt products that are specific to
    //thus application
    get_products_specific() {
        return [
            {
                title: "Registration",
                id: 'registration',
                solutions: [
                    //
                    //add intern registration to services.
                    {
                        title: "Register intern(LV2)",
                        id: "piq",
                        listener: ["event", () => this.register_intern()]
                    },
                    {
                        title: "Edit my profile",
                        id: "my_profile",
                        listener: ["event", () => this.edit_profile()]
                    }
                ]
            },
            {
                title: "Actions",
                id: 'actions',
                solutions: [
                    {
                        title: "Manage Events",
                        id: "events",
                        listener: ["crud", 'event', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Create an event",
                        id: "create_event",
                        listener: ["event", () => this.create_event()]
                    },
                    {
                        title: "Manage Messages",
                        id: "messages",
                        listener: ["crud", 'msg', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Create message",
                        id: "create_msg",
                        listener: ["event", () => { this.new_msg(); }]
                    },
                    {
                        title: "Reply message",
                        id: "reply_message",
                        listener: ["event", () => this.reply_msg()]
                    }
                ]
            },
            {
                title: "Tea Services",
                id: 'tea_services',
                solutions: [
                    //
                    //Registering tea delivery 
                    {
                        title: "Tea Delivery",
                        id: "tea_delivery",
                        listener: ["event", () => this.tea_delivery()]
                    },
                    //
                    //Tea payments
                    {
                        title: "Pay Tea",
                        id: "pay_tea",
                        listener: ["event", () => this.pay_tea()]
                    }
                ]
            },
            {
                title: "Assignments",
                id: 'assignments',
                solutions: [
                    //
                    //Allow users to input assignments and save to the database 
                    //from GUI.
                    {
                        title: "Input Assignments",
                        id: "input_assignments",
                        listener: ["event", () => this.input_assignments()]
                    }
                ]
            },
            {
                title: "Website",
                id: "add_definer",
                solutions: [
                    //
                    {
                        title: "View website",
                        id: "website",
                        listener: ["event", () => this.website()]
                    },
                    //populate definers from the database
                    {
                        title: "New Definer",
                        id: "definer",
                        listener: ["event", () => this.definer()]
                    }
                ]
            },
            {
                title: "SVG Work",
                id: "svg_work",
                solutions: [
                    {
                        title: "SVG",
                        id: "svg",
                        listener: ["event", async () => this.svg()]
                    }
                ]
            }
        ];
    }
    //
    //Edit the current user profile using a PIQ form.
    async edit_profile() {
        //
        //Create an instance of edit_ profile class.
        const edit = new profile.edit_my_profile(this);
        //
        //Call the crud.
        const result = await edit.administer();
        //
        //Check whether the user aborted the administration. If aborted 
        //discontinue this method.
        if (result === undefined)
            return;
        //
        //The administration was not aborted. update this application page 
        //including all the application page for the logged in users(CONSIDER 
        //USIG SOCKETS TECHNOLOGY).
        this.update_app();
    }
    //
    //
    update_app() {
        throw new Error('Method not implemented.');
    }
    //
    //
    async svg() {
        //
        //Create an instance of the  class
        const Svg = new svg.svg(this);
        //
        //Call crud page and close when done.
        const result = await Svg.administer();
        //
        //check the validity of the data
        if (result === undefined)
            return;
        //
    }
    //
    //
    async website() {
        //
        //create an instance of the class 
        const Website = new web.website(this);
        //
        //Call crud page and close when done.
        const result = await Website.administer();
        //
        //check the validity of the data
        if (result === undefined)
            return;
    }
    //
    //Tea delivery
    async tea_delivery() {
        //
        //Create an instance of the tea_delivery class
        const delivery = new tea.tea_delivery(this);
        //
        //Open the popup and close when the user is done.
        await delivery.administer();
        //
        //
        return true;
    }
    //
    //Tea payment
    async pay_tea() {
        //
        //Create an instance of the tea payment class.
        const payment = new tea.pay_tea();
        //
        // Open the popup and close when the user is done.
        await payment.administer();
        //
        //
        return true;
    }
    //
    //Allow users to input assignments from a UI
    async input_assignments() {
        //
        //Create an instance of input assignments.
        const input = new input_assignments();
        // 
        //Call crud page and close when done.
        await input.administer();
    }
    //
    //Create event and display on the events panel
    async create_event() {
        //
        //Create an instance of the class
        const Event = new eve.event_planner(this);
        //
        //Call crud page and close when done.
        const result = await Event.administer();
        //
        //check the validity of the data
        if (result === undefined)
            return;
    }
    //
    //An event listener for registering a new user.
    async register_intern() {
        //
        //create an instance
        const Piq = new piq.register_intern(this);
        //
        //check whether the result is true or false(if we have successfully 
        //registered an intern)
        //Cast to define true or undefined.
        const result /*: true | undefined */ = await Piq.administer();
        //
        //continue only if a user was successfully registered.
        if (result === undefined)
            return;
        //
        //update the homepage with the new intern(s).
        return true;
    }
    //An event listener for creating a new message.
    async new_msg() {
        //
        //Create a terminal page that facilitates sending a new message
        const page = new msg.new_message(this);
        //
        //Collect the message from the user and send it.
        const result = await page.administer();
        //
        //Check if the message was successfully sent. If not do nothing.
        if (result === undefined)
            return;
        //
        //The message was succesfully sent so update the message panel
        // of this application page.
        this.refresh_message_panel();
    }
    //
    //Get the messages panel and refresh to display the new message.
    refresh_message_panel() {
        //
        //Get the message panel.
        const message = this.get_element('message');
        //
        //Repaint the panel.
        // const query =;
    }
    //
    //Reply to the message that is currently selected in
    //the message panel of the application.
    async reply_msg() {
        //       
        //1. Get the message panel    
        const panel = this.get_element("message");
        //
        //2. Get the primary key using the message panel.
        const pk = await this.get_selected_message_pk(panel);
        //
        //2.3 Use the primary key to retrieve the text message from the database.
        const msg = await this.get_message_text(pk);
        //
        //Get the message (msg) from above and store it locally to be able to access it 
        //when the reply message fires.
        localStorage.setItem('msg', JSON.stringify(msg));
        //
        //Create a terminal class to supprot the reply message.
        const reply = new rep.Reply_message(this);
        //
        //Wait for the user to reply.
        const response = await reply.administer();
        //
        //Check the response to see whether the user aborted the reply
        //or not. If aborted, discontinue this process.
        if (response === undefined)
            return;
        //
        //At this point we are successful to replying to the message.
        //Refresh the message panel to see the response. This is a drastic action
        //that causes the page to flash. A better method would be to add the reply
        //to the message panel. Thats the challenge, but for this version we shall take
        //the less sophisticated method.
        //
    }
    //
    ///Get the primary key of the selected message using the panel.
    async get_selected_message_pk(panel) {
        //
        //Get the class of the selected message.
        const message = panel.querySelector(".TR");
        //
        //Use the message class to get the primary key
        const msg_pk = message.getAttribute("pk");
        //
        //Convert the string to a number.
        const number = parseFloat(msg_pk);
        //
        //Return the primary key.
        return number;
    }
    //
    //Get the message from the database using the primary key above.
    async get_message_text(pk) {
        //
        //Get the message from the database and extract
        //the text from the database.
        this.msg = await server.exec("database", ["mutall_users"], "get_sql_data", [`SELECT text, subject FROM  msg WHERE msg.msg = ${pk}`]);
        //
        const message = this.msg[0];
        //
        //return the text message.
        return { text: message.text, subject: message.subject };
    }
    //
    async definer() {
        //
        //
        const select = this.get_element("definer");
        //
        //List of definers
        const definer = await server.exec("database", ["mutall_tracker"], "get_sql_data", ["select id from definer"]);
        //
        //Formulate the option from the definers list.
        const options = definer.map((definer) => `<option value= '${definer.id}'>${definer.id}</option>`);
        //
        //Convert option to text
        const options_str = options.join("\n");
        //
        //Attach the options to the select element.
        select.innerHTML = options_str;
    }
    //
    //Override the initializa method.
    async show_panels() {
        //
        //call the super/parent initialization.
        await super.show_panels();
    }
}
//
//Assignments input. 
class input_assignments extends outlook.popup {
    //
    constructor() {
        super('');
    }
    //
    //
    async check() { return true; }
    ;
    //
    //Check if a file json containing Iquestionare is selected.
    async get_result() { }
    //
    //add an event listener.
    async show_panels() {
        //
        //Get the ok button
        const save = this.get_element("go");
        //
        //
        save.onclick = async () => this.input_assignments();
    }
    input_assignments() {
        alert('Success');
    }
}
