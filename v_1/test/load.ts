//
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as app from "../../../outlook/v/code/app.js";
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
import main  from './main.js';
//
//
import * as quest from '../../../schema/v/code/questionnaire.js';
//
//Load table data from mutallco_rental.
export class load_tables 
    extends outlook.terminal 
{
    
     
    //
    //
    constructor(mother: main){
        //
        super(mother, '../../../outlook/v/code/general.html');
    }
    //
    //
    async check(): Promise<boolean> {
        //
        //Get the agreement.
        const agreements:Array<quest.layout> = this.get_agreement_layouts();
        //
        //Effect the room data transfer.
        const result:'Ok' | string = await server.exec(
            'questionnaire',
            [agreements],
            'load_common',
            []            
        );
        //
        //Check the result and if there is an error stop and report the error.
        if(result !== 'Ok') {
            //
            //Get the content of the html.
            const errors = this.get_element('content');
            //
            //Add the error message to the page.
            const msg = `The loading failed for '${result}' check the log file to see whats the error.`;
            //
            //Create a div and apend the text.
            errors.textContent = msg ;
            //
            //Stop the loading.
            return false;
        }
        //Get the content of the html.
        const ok = this.get_element('content');
        //
        //Create the message.
        const msg = 'ok';
        //
        //Create a div element and append the value.
        ok.textContent = msg ;
        //
        return true;
    }
    //
    //Formulate the layouts for transfering client data.
    get_agreement_layouts(): Array<quest.layout> {
        //
        //Get the table name.
        const tname = "agreement";
        //
        //Get the source of data as a table object.
        const source:quest.table = {
            //
            //The type of table to generate from the query.
            class_name:"\\mutall\\capture\\query",
            args: [
                //
                //The table name used to specify the data columns.
                `${tname}`,
                //
                //The Data source to execute.
                `select 
                    client.name as client_name,
                    room.uid as room_uid, 
                    agreement.amount,
                    agreement.start_date,
                    agreement.duration,
                    agreement.review,
                    agreement.terminated,
                    agreement.valid,
                    agreement.comment 
                from 
                    agreement 
                    inner join client on agreement = client.client 
                    inner join room on agreement = room.room
                `,
                //
                //The database on which to execute the query.
                `${this.dbname}`
            ]
        };
        //
        //Get the destination of the data as an array of labels.
        const dest:Array<quest.label> = [
            ["rental_","agreement", [],"start_date", ["\\capture\\lookup","agreement","start_date"]],
            ["rental_","agreement", [],"terminated", ["\\capture\\lookup","agreement","terminated"]],
            ["rental_","agreement", [],"review", ["\\capture\\lookup","agreement","review"]],
            ["rental_","agreement", [],"amount", ["\\capture\\lookup","agreement","amount"]],
            ["rental_","agreement", [],"valid", ["\\capture\\lookup","agreement","valid"]],
            ["rental_","agreement", [],"duration", ["\\capture\\lookup","agreement","duration"]],
            ["rental_","agreement", [],"comment", ["\\capture\\lookup","agreement","comment"]],
            ["rental_","client", [], "name", ["\\capture\\lookup", "agreement", "client_name"]],
            ["rental_","room", [], "uid", ["\\capture\\lookup", "agreement", "room_uid"]]
        ];
        //Return the source and destination layouts.
        return [source, ...dest];
    }
    //
    //Additional information is added here after the user has system has loaded.
    async show_panels(): Promise<void> {}    
}