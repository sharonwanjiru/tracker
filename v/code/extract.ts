//Execute PHP methods from javascript
import * as server from "./../../../schema/v/code/server.js";

type Iminute = {
    surname:string,
    name:string,
    problem:string,
    plan:string,
    outcome:string
}
             
export async function display_md():Promise<void>{
    //
    //1.Get the query results
    const minutes = await get_minute();
    //
    // 2. Generate Markdown content
    const markdown = create_markdown(minutes);  
    //
    // 3. Generate filename
    const filename = create_filename(minutes);
    //
    // 4. Save Markdown content to a file
    save_file(markdown, filename);
}

async function get_minute(): Promise<Array<Iminute>>{
   //
   //Get the filethat has the sql to run
   const sql = `
        Select 
            intern.surname, 
            project.name,
            project.problem, 
            project.plan,
            project.outcome
        from project  
        join \`work plan\` ON project.\`work plan\` = \`work plan\`.\`work plan\` 
        join intern ON \`work plan\`.intern = intern.intern 
        where \`work plan\`.\`work plan\` = 6`;
    //
    //Execute the esql and get the database rows
    const rows:Array<{surname:string,name:string, problem:string,plan:string,outcome:string}> = await server.exec(
        'database',
        ['tracker_mogaka'],
        'get_sql_data',
        [sql]
    );   
    
    const minutes:Array<Iminute>= rows.map(row => ({surname: row.surname,name: row.name, problem: row.problem,plan:row.plan,outcome: row.outcome}));
    
    //
    //Return the minutes
    
    return minutes;
}
function create_markdown(minutes:Array<Iminute>):string{
    
    let md = '';
    
    minutes.forEach(minute => {
        md += `# ${minute.name}\n`;
        md += `## Problem\n${minute.problem}\n`;
        md += `## Plan\n${minute.plan}\n`;
        md += `## Outcome\n${minute.outcome}\n`;
    });
    return md;
    console.log(md);
}

function create_filename(minutes:Array<Iminute>):string{
    //
    // get the cureent date
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    //
    const surname = minutes[0].surname;
    //
    // formulate the filename
    const filename =  `${surname}_${date}.md`;
    //
    // return the file name
    return filename;
}

async function save_file(md: string, filename: string){
    //
    // get the directory
    const directory = '/tracker/v_1/data/minutes/';
    //
    // create a path
    const path = `${directory}${filename}`;
    
    //
    // If the file does not exist, create it
    await server.exec("path", 
                      [path, true], 
                      "put_file_contents", 
                      [md]);
                      
    alert("succesfully saved minutes");
  
}