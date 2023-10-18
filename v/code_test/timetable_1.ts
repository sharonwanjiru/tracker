
import {mutall_error} from "./../../../schema/v/code/schema.js";

//Import the page and view class from outtlook
import {page} from "./../../../outlook/v/code/view.js";

//Execute PHP methods from javascript
import {exec} from "./../../../schema/v/code/server.js";

import {Ipresentation} from "./presentations.js";

//The data structure that drives the timetable
type Itimetable = {
    //
    //Day of the week, 1..7
    day_code:number,
    //
    //E.g., Monday, Tuesday, etc
    day_name:string,
    //
    //The peresenters of the day
    interns:Array<Iintern>
}

// Data structure of Iintern
type Iintern = {
    //Presenter
    intern:number,
    surname:string,
    //
    //Details of the presenter
    name:string,
    image:string,
    qualification:string,
    university:string,
    year:string,
    //
    //True if this is presenter of the day; otherwise false
    presenter:boolean,
    //
    //Allthe presenttaions of the current intern
    //
    //NB: The presentation is imported from presentation.ts
    presentations: Array<Ipresentation>
}

//
//The data structure of a workplan
type Iworkplan = {
    intern:number;
    items: Array<Iproject>;
}
//
// The data structure of a project
type Iproject = {
    name:string;
    problem:string;
    plan:string;
    outcome:string;
}
//
// The class or displaying the timetable 
export class timetable extends page{
    //
    //The data that drives the tmetable
    public model?:Array<Itimetable>;
    // 
    constructor(){
        super();
    }
    
    //See the dummy.html file for the view
    public async show_panels(): Promise<void>{
        //
        //1.Run the query to get the timetable (data)
        this.model = await this.get_timetable();
        //
        //2. Attach the timetable to the navigation at the header
        this.show_nav('mobile');
        //
        //3. Attach the timetable to the right navigation panel
        this.show_nav('left');
        
    }
    
    //Retrieve the data that drives this time table
    private async get_timetable(): Promise<Array<Itimetable>>{
        //
        //Get the file that has the sql to run
        const str = '/tracker/v/code/timetable.sql';
         //
        //Execute the sql and get the database rows
        const rows:Array<{day_code:number,day_name:string, interns:string}> = await exec(
            'database',
            ['tracker_mogaka'],
            'get_sql_data',
            [str,'file']
        );
        //
        //Decode the intern string to an Iitern structure
        const Itimetables: Array<Itimetable> = rows.map(row =>({
            day_code: row.day_code,
            day_name: row.day_name,
            interns: JSON.parse(row.interns)
        }));
        //
        // Return the time table data
        return Itimetables;
    }
    // 
    //Show the navigation contents in the identifed (panel) anchor
    private async show_nav(id:string):Promise<void>{
        //
        //1. Get the named anchor element
        const anchor: HTMLElement = this.get_element(id);
        //
        //2. Read the dummy html fragment; it represents one day of the timetable.
        //Read about the fetch command
        const html:string = await this.get_dummy_html(); 
        //
        //3.Use the dummy fragment to show as many daya as there are in the 
        //curren othegiven anchor
        this.model?.forEach(day=>this.show_day(day, anchor, html));      
    } 
    
    //
    //2. Read the dummy html fragment; it represents one day of the timetable.
    //Read about the fetch command
    private async get_dummy_html(): Promise<string>{
        //
        // Get a server response using the dummy file
        const response: Response = await fetch('./dummy.html');
        // 
        // Check whether there was an error in server-client communication 
        // If there is an error report it to the user and stop the processing
        if (!response.ok) throw new mutall_error("Something went wrong with the fetch");
        //
        // Use the response to get the requested text
        const text: string = await response.text();
     
        //
        //Return the dummy text as requested 
        return text;
    }
    /*
     <details class="day" open="">
        <summary data-day_name>Monday</summary>
        $fragment
        $fragment
        ...
    </details>
    */
    private show_day(day:Itimetable,anchor:HTMLElement, fragment:string):void{
        //
        //3.1 Create a details day element attached to the anchor
        const day_element: HTMLDetailsElement = this.create_element("details",anchor,
        {className:"day"});
        //
        // Create a summary tag and attach the day_name
        this.create_element("summary", day_element, {textContent: day.day_name});
        //
        //Display each intern's personal details, by populating a htm fragment
        day.interns.forEach(intern=>this.show_intern(day_element,fragment,intern));
    }
  
    //Display each intern's personal details, by populating the following html 
    //fragment
    /*
     <details style="margin-left:10px">
        <summary>
            <img data-image src="http://drive.google.com/uc?export=view&id=10KYtxL82ANblZbwrAgMc_R7WoHTu8KKD"
                alt=""
                style="height:50px"/>
            <span data-name>George Kanga'ra(GK)</span>
        </summary>
        <p>
            <span data-qualification>Bsc. Computer Technology</span>:&nbsp; 
            <span data-year>2019</span>
        </p>
        <p data-university>Meru University</p>
        <a data-workplan href="https://dev.mutall.co.ke/tracker/portfolio/2023/kangara.html">
            Workplan 2023
        </a>
        <details data-presentatations>
            <summary>Presentations</summary>
            <!--
            <div onclick="this.mogaka.show_presentation(23)">2/5/2023</div>
            <div onclick="this.mogaka.show_presentation(43)">9/5/2023</div>
            -->
        </details>
    </details>
     */
     //All tags marked ith the data-* attribute needs to be completed from the 
     //given Iitern data whose structure is:-
     //
     //{
     //Direct mappings..
     // fullname, surname, year, qualification, university, 
     //
     //special mappins
     // image, workplan, presentations
     //}
     //Start by populating the direct mappings, followed by the special cases
    private show_intern(anchor:HTMLElement,fragment:string,intern:Iintern):void{
        //
        //Show the details tag(indirectly, i.e., using outerHTML)
        const details: HTMLDetailsElement = this.show_details(anchor, fragment);
        //
        //Show summary associated with the details
        this.show_summary(details, intern.image, intern.name);
        //
        //Show  the personal data for the intern (presenter). (using same direct mapping)
        this.show_personal_details(details, intern.qualification, intern.year, intern.university);
        //
        //Show workplan as hyperlikk (that opens a opendeto a new page in the old 
        //version) that populates the content panel with the inern's workplan
        this.show_workplan(details, intern.intern); 
        //
        //Show all presetations for this intern sorted by the most recent first
        this.show_presentations(details, intern.presentations); 
    }
    
    //Show the details tag(indirectly, i.e., using outerHTML)
    private show_details(anchor:HTMLElement, fragment:string):HTMLDetailsElement{
        //
        //Create the details elemenet and attach to the achor elenent
        const details: HTMLDetailsElement = this.create_element('details',anchor);
        //
        //Replace the element with the fragment
        details.innerHTML = fragment;
        //
        return details;
    }
    
    //Show summary associated with the details
    /*
     <summary>
            <img data-image src="http://drive.google.com/uc?export=view&id=10KYtxL82ANblZbwrAgMc_R7WoHTu8KKD"
                alt=""
                style="height:50px"/>
            <span data-name>George Kanga'ra(GK)</span>
        </summary>
     */
    private show_summary(fragment:HTMLDetailsElement, image:string, name:string):void{
        //
        //1. Show Image
            //1.1 Look image tag with the data-image attribute
            const image_tag:HTMLElement|null = fragment.querySelector("[data-image]");
            //
            // 1.2 If the image is null throw an error
            if (image_tag===null) throw new mutall_error(`No image found in your fragment`);
            //
            // 1.3 If there is no instance of image throw anerror
            if (!(image_tag instanceof HTMLImageElement)) throw new mutall_error('Image Element expected')
            //
            //1.3Set its source to the image value
            image_tag.src = image;
        //
        //2.Show the interns name
        this.show_key('name', name, fragment);
    }
    
    //
    //Show  the personal data for the intern (presenter). (using same direct mapping)
    /*
      <p>
            <span data-qualification>Bsc. Computer Technology</span>:&nbsp; 
            <span data-year>2019</span>
        </p>
        <p data-university>Meru University</p>
     */
    
    private show_personal_details(fragment:HTMLDetailsElement,qualification:string,year:string, university:string):void{
        //
        // Show the qualification of an intern
        this.show_key('qualification',qualification,fragment);
        //
        // Show the year of completion of an intern
        this.show_key('year',year,fragment);
        //
        // Show the university an inern attended
        this.show_key('university',university,fragment);
    }
    private populate_key(key:keyof Iintern, fragment:HTMLElement, intern:Iintern):HTMLElement{
       //
       // 1. Find an element described by a key in a fragment
       const elem:HTMLElement|null = fragment.querySelector(`[data-${key}]`);
       //
       // 2. If the element is null throw an error
       if (elem===null) throw new mutall_error(`No ${key} found in your fragment`);
       //
       // 3. Populate the element of the given key with the intern details
       elem.textContent = String(intern[key]);
       //
       // 4. Return the element
       return elem; 
    }
    
    //Showing the value of a key
    private show_key(key:string, value:string, fragment:HTMLDetailsElement){
       //
       // 1. Find an element described by a key in a fragment
       const elem:HTMLElement|null = fragment.querySelector(`[data-${key}]`);
       //
       // 2. If the element is null throw an error
       if (elem===null) throw new mutall_error(`No ${key} found in your fragment`);
       //
       // 3. Populate the element of the given key with the intern details
       elem.textContent = value;
        
    }
    
     /*
       <a data-workplan href="https://dev.mutall.co.ke/tracker/portfolio/2023/kangara.html">
            Workplan 2023
        </a>
     */
    populate_workplan(fragment:HTMLElement,intern:string){
        //
        // Get the url of the portfolio 
        const url:string = "https://dev.mutall.co.ke/tracker/portfolio";
        //
        // Concatenate the surname to the url
        const path:string = `${url}/${intern}.html`;
        //
        // Populate the workplan
        const workplan = fragment.querySelector("*[data-workplan]");
        if (workplan instanceof HTMLAnchorElement) {
            //
            // Attach the href
            workplan.href = path;
            //
            //Get the year 
            const year = new Date().getFullYear();
            //
            // Attach the text content to the workplan anchor
            workplan.textContent = "Workplan"+year;
        }
               
    }
    /*
     * The is expected to look as below
            <div onclick="this.mogaka.show_presentation(23)">2/5/2023</div>
            <div onclick="this.mogaka.show_presentation(43)">9/5/2023</div>
     */
    private show_presentations(fragment:HTMLDetailsElement,presentation:Ipresentation[]):void{
        //
        // Get the presentations element
        const presentations: HTMLElement | null = fragment.querySelector("[data-presentations]");
        //
        // if the presentations element is null, throw an error
        if (presentations === null) {
            throw new mutall_error("No presentation element found");
        }
        //
        //Display each presentation
        if (!presentations === null )
        presentation.forEach(p=>{
            // create the div tag 
            const div: HTMLDivElement = this.create_element("div",fragment);
            //
            //Attach the text content which is the date
            div.textContent = p.date;

            console.log(div);
            //
            // Add the onclick
            div.onclick = () => alert("Welcome");
        });
   }    
    //
    //Show workplan as hyperlikk (that opende to a new page in the old 
    //version) that populates the content panel with the inern's workplan
    /*
     <a data-workplan onclick = ()=>this.display_workplan($pk)">
        Workplan 2023
    </a>
     */
    private show_workplan(fragment:HTMLDetailsElement, intern:number):void{
        //
        //
       // Find the element with data-workplan attribute
       const elem:HTMLElement|null = fragment.querySelector(`[data-workplan]`);
     
       //
       // Report to the user if the element cannot be found
       if (elem===null) throw new mutall_error(`No workplan found in your fragment`);
       //
       //Add the listener for listing the inrens orkplan in the content panel
       elem.onclick = ()=>new workplan().show(intern);
       
    } 
}

class workplan extends page{
    //
    //The data that drives the tmetable
    public workplan_model ?:Array<Iworkplan>;
    // 
    constructor(){
    super();
    }
    //
    //  The show method is supposed to show the workplan of an intern on the 
    //  content panel as shown below
    /*
        <details>
        <summary data-name><h1 style="display:inline">Chat</h1></summary>
        <h2>Problem</h2>
        <p data-problem>
            Real-time communication between users has been a problem with the Mutall 
            Outlook/Schema Library.With WebSockets, as a compliment to the existing 
            messaging system .i.e, the Mutall Messaging and Emailing System.The 
            development of the Chat System will enable real time communication and 
            an application that will Rival WhatsApp.
        </p>
        <h2>Plan</h2>
        <p data-plan>
            Develop a Chat System so well established that it will compete with 
            WhatsApp and our users will instead use the Mutall Chat(For lack of a 
            better naming) instead.
        </p>
        <h2>Outcome</h2>
        <p data-outcome>system</p>
        </details>
     */
    public show(intern:number):void{
         //
        //1.Run the query to get the workpaln (data)
        this.get_workplan();
        //
        //2.Get the content panel id
        const content_panel: HTMLElement = this.get_element('content');
        //
        //3. Attach the workplan to the content panel 
        this.show_content(intern,content_panel);     
    }
    //
    // Get the query results to populate the workplan
    private async get_workplan(): Promise<Array<Iworkplan>>{
        //
        //Get the file that has the sql to run
        const str = '/tracker/v/data/timetable.sql';
         //
        //Execute the sql and get the database rows
        const rows:Array<{day_code:number,day_name:string, interns:string}> = await exec(
            'database',
            ['tracker_mogaka'],
            'get_sql_data',
            [str,'file']
        );
        //
        //Decode the intern string to an Iitern structure
        const Itimetables: Array<Itimetable> = rows.map(row =>({
            day_code: row.day_code,
            day_name: row.day_name,
            interns: JSON.parse(row.interns)
        }));
        //
        // Return the time table data
        return Itimetables;
    }
    
}
