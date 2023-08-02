//
//Import the page class from outlook
import { page } from "../../../outlook/v/code/view.js";
//
//Import server library
import * as server from "../../../schema/v/code/server.js";
//
//To support error handling
import { mutall_error } from "../../../schema/v/code/schema.js";
//
//Create minute as an extension of the page class
export class minute extends page {
    surname;
    date;
    anchor;
    //
    //Hold the pk of the current minute
    current_minute;
    //
    //Store the pk of the project containing current minute
    presentation_pk;
    //
    constructor(surname, date, anchor) {
        //
        super();
        this.surname = surname;
        this.date = date;
        this.anchor = anchor;
        //
    }
    //
    //Override the show_panels method with the following:-
    //
    /*
       * Paint the web document with results fetched from the db
       *
       * 1. Develop a query that gets data form the database in the most suitable form
       *    /tracker/v/code/minutes.sql
       *
       * 2. Execute the querry and get the required results
       *
       * 3. Decode the json result and destructure the decoded json
       *
       * 4. Display the results along the following line :-
       * <body>
       *    <h1>$presentation_title</h1>
       *    <details>
       *        $Project
       *        <details>
       *            $minutes
       *            $contribution
       *        </details>
       *    </details>
        </body>
       */
    async show_panels() {
        //
        //Read the sql statement from a file /tracker/v/code/minutes.sql
        let minutesql = await server.exec("path", ["/tracker/v/code/minutes.sql", true], "get_file_contents", []);
        //
        //Replace the date and name parameters in the sql with actual values
        const minute2sql = this.replace_parameters(minutesql);
        //
        //Get the data specified in minutes.sql
        const presentations = await server.exec("database", ["tracker_mogaka", false], "get_sql_data", [minute2sql]);
        //
        //Show the data following the sample in template.html
        //
        //Get the anchor ?? look for the body element
        const body = this.anchor ?? this.get_element("body");
        //
        //Create the title
        this.create_element("h1", body, {
            textContent: "MINUTES FOR KANG'ARA'S PRESENTATION ON 12/06/2023",
        });
        //
        //Decode, destructure and display the presentations
        presentations.forEach((presentation) => this.destructure(presentation, body));
    }
    //
    //Replace the 
    replace_parameters(sql) {
        //
        //substitute the presentation.date and inter.surname placeholder with actual values77
        return sql.replace(':date', `'${this.date}'`).replace(':surname', `'${this.surname}'`);
    }
    //
    //Get the presentation
    //From the presentation record the pk of the presentation
    //Convert the agenda items under a presentation form a string to a json array
    //Finally for each item under the agenda display the project
    //
    destructure(presentation, anchor) {
        //
        //Record the pk of the presentation
        this.presentation_pk = presentation.presentation;
        //
        //Decode the agenda under the presentation
        const agenda = JSON.parse(presentation.agenda);
        //
        //Display the project
        agenda.forEach((project) => this.display_project(project, anchor));
    }
    //
    //
    //Display a single project with the following structure
    /*
          <details class="project">
            <summary><h2>$project</h2></summary>
            $minute
          <details>
        */
    display_project(data, body) {
        //
        //Destructure the project
        const { name, plan, minutes, outcome, problem, project } = data;
        //
        //Show the project tag that envelops the summary and the minutes
        const details = this.create_element("details", body, {
            className: "project",
        });
        //Show the summary tag under the project
        this.create_element("summary", details, { textContent: name });
        console.log(minutes);
        //
        //Show the minutes under the project
        minutes.forEach((minute) => this.display_minute(minute, details));
    }
    //
    //Get the data
    //Display a single minute with the following structure
    /*
         <details class="minute">
            <summary>$minute.summary</summary>
            <div>$ minute.detail</div>
            $minute.contribution
         </details>
       */
    display_minute(data, project_details) {
        //
        //Destructure the minute
        const { detail, numeral, summary, contributions, minute } = data;
        //
        //Create a minute detail tag that envelops the summary minute details and
        //the contributions
        const details = this.create_element("details", project_details, { className: "minute" });
        //
        //Create an element to hold the number and summary
        this.create_element("summary", details, {
            textContent: `${numeral} ${summary}`,
        });
        //
        //create a content container to hold the minute detail
        const minute_details = this.create_element("p", details, {
            className: "content",
            textContent: detail,
        });
        //
        //Show the contributions
        this.show_contributions(details, contributions, minute);
    }
    //
    //Display contributions following the following html snippet
    /*
       <h3>Contribution</h3>
       <button>Add</button>
       $contributions
       */
    show_contributions(anchor, contributions, minute_pk) {
        //
        //Create a heading for the contribution
        this.create_element("h3", anchor, {
            textContent: "Contributions",
        });
        //
        //Create a button for adding contributions
        const button = this.create_element("button", anchor, {
            type: "button",
        });
        //
        //Add an event listener for the button
        button.onclick = () => this.show_dialog(minute_pk);
        //
        //Display the individual contributions if any
        if (contributions !== null) {
            contributions.forEach((contribution) => this.display_contribution(contribution, anchor));
        }
    }
    //
    //Show the contribution dialog
    show_dialog(minute_pk) {
        //
        //Save the pk of the minute that the contribution is to be added
        this.current_minute = minute_pk;
        //
        //Get the contribution dialog
        const dialog = this.get_element("contributions_dialog");
        //
        //Show the dialog
        dialog.showModal();
    }
    //
    //Display a single contribution with the following structure
    //<p>$contribution</p>
    display_contribution(contribution, container) {
        //
        //Create a paragraph to display a contribution item
        this.create_element("p", container, {
            textContent: `${contribution.content} (${contribution.contributor})`,
        });
    }
    //
    //Dismiss the given dialog box
    dismiss_dialog() {
        //
        //Get the text area
        const contribution_input = this.get_element("contribution_input");
        //
        //Clear the input in n the text area
        contribution_input.value = "";
        //
        //Get the contribution dialog
        const dialog = (this.get_element("contributions_dialog"));
        //
        //Make the dialog box
        dialog.close();
    }
    //Save the contribution to the database (using the PHP questionnaire class)
    /*
     * 1. Collect all the required layouts to save a contribution
     *
     * 2.
     */
    async save_contribution() {
        //
        //
        //Collect the data to save as layouts. The most basic being the user contribution
        const layouts = [...this.collect_layouts()];
        //
        //Save the data collected in layouts to the tracker datase, retuting ok if
        //successful or a an error as a HTM: string
        const results = await server.exec("questionnaire", //Name of the PHP class to use
        ["tracker_mogaka"], //Constructor arguments
        "load_common", //The method to run
        [layouts] //Method arguments
        );
        //
        //Report the result
        alert(results);
        //
        //Close the dialog
        this.dismiss_dialog();
    }
    //
    //Collect all the data required to save a contribution along the following lines
    //The focus of our saving is the contribution.content
    //
    //The following data must be available for the content to be saved
    //
    //The identifiers of contribution are:-
    //intern, minute, contribution.ref
    //
    //The identifiers of intern are:-
    //intern.surname
    //
    //The identifiers of minute are:-
    //presentation.presentation, minute.minute
    //
    *collect_layouts() {
        //
        //produce layout of contribution content
        yield [this.get_contribution(), "contribution", "content"],
            //
            //produce layout of intern
            yield [this.get_contributor(), "intern", "surname"],
            //
            //produce layout of minute
            yield [this.get_minute_pk(), "minute", "minute"],
            //
            //Get the current timestamp when the contribution was made
            yield [this.get_time(), "contribution", "ref"],
            //
            //Get the presentation identifying the minute
            yield [this.get_presentation(), "presentation", "presentation"];
    }
    //
    //Retrieve the minute reference under which a contribution was made
    get_minute_pk() {
        //
        //Check to see if there is a current minute
        if (this.current_minute === undefined)
            throw new mutall_error("No minute found");
        //
        //Produce the primary key of the minute
        return this.current_minute;
    }
    //
    //Get the presentation of the current minute
    get_presentation() {
        //
        //Check to see if there is a project
        if (this.presentation_pk === undefined)
            throw new mutall_error("No minute found");
        //
        //Produce the primary key of the minute
        return this.presentation_pk;
    }
    //
    //Retrieve contribution entered by user
    get_contribution() {
        //
        //Get the text area
        const contribution_input = this.get_element("contribution_input");
        //
        //Retrieve the content in the text area
        return contribution_input.value;
    }
    //
    //Return a  current timestamp as a string with the following pattern bellow: -
    // yyyy-mm-dd HH:mm:ss i.e. 2023-07-26 20:53:37
    //
    //Get the current time stamp as is given
    //Create a pattern of the desired timestamp
    //Use the defined pattern to format the current timestamp
    //Return the formatted timestamp as a string
    //
    //Get current time in a format acceptable by sql
    get_time() {
        //
        //Create a new instance of the date
        const timestamp = new Date();
        //
        //Format the date to a format acceptable by mysql
        //
        //Create the format with the help of the Int1
        const format = new Intl.DateTimeFormat("en-UK", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
        //
        //Get the date that is formatted (mm-dd-yyyy, HH:mm:ss)
        const date_time = format.format(timestamp);
        //
        //Separate the date and the time section
        const separated = date_time.split(",");
        //
        //Create a new date that matches the sql format by:-
        //
        //Store the date gotten from above
        let date = separated[0];
        //
        //Split the date to get the month day and year
        //Split the date using the /
        const separated_date = date.split("/");
        //
        //Compose a new date following the format yyyy-mm-dd
        date = `${separated_date[2]}-${separated_date[1]}-${separated_date[0]}`;
        //
        //Combine the new date with the time and return the resulting timestamp
        const current = date.concat(separated[1]);
        //
        return current;
    }
    //
    //Get the surname of the contributor from the local storage
    get_contributor() {
        //
        //Retrieve the surname from the local storage
        const surname = localStorage.getItem("userfullname");
        //
        //Check if username exists
        if (surname === null) {
            //
            //If the surname is null prompt the user to enter
            const name = this.prompt_username();
            //
            //Save the name in the local storage
            localStorage.setItem("userfullname", name);
            //
            //Return the intern surname from the prompt
            return name;
        }
        else {
            //
            //Return a surname if it exist
            return surname;
        }
    }
    //
    //Get the name of the contributor by asking
    prompt_username() {
        //
        //Get the name input by the user
        const name = prompt("Please Enter your surname?");
        //
        //Test if the user entered a name or not
        if (name !== null) {
            //
            //Return the name entered by the user
            return name;
        }
        else {
            //
            //Produce an error if no name is provided
            throw new mutall_error("Name not entered can not copy");
        }
    }
}
