//Use the server library t spport communicatio between javascrit and PHP
import * as server from "../../../../schema/v/code/server.js";

async function save(area: HTMLTextAreaElement, full_name: string) {
    //
    //Extract the edited text
    const text: string = area.value;
    //
    //Call the server to save the text
    const result: number | false = await server.exec(
        "path",
        [full_name, true],
        "put_file_contents",
        [text]
    );
    //Test if the writing was successful or not
    if (result === false) alert("Failed to write");
    else alert("Minutes Saved Successfully");
}

export async function editor(name: string) {
    //
    //Formulate the fullname of the file
    const full_name = `/tracker/minutes/v/${name}`;
    //
    //1. Get text for editing into the text area
    //
    //1.1 Read text from file /tracker/minutes/file
    const text: string = await server.exec(
        "path",
        [full_name, true],
        "get_file_contents",
        []
    );
    //
    //1.2 Get the text area element;
    const textarea = <HTMLTextAreaElement>(window.document.getElementById("content"));
    //
    //1.3 Place the text in the text area eleent
    textarea.value = text;
    //
    //2 Add an event listener to the save button
    //
    //2.1 Get the save buttom from the HTML
    const save_button = <HTMLButtonElement>document.getElementById("save");
    //
    //Attach an event listener for saving saving the contents o the text area
    //to the given file
    save_button.onclick = async () => await save(textarea, full_name);
    
}

//Copy the given file to some. The destination is the copies folder under
//tracker minutes and the file mame is the same as the original
export async function copy(full_name: string): Promise<void> {
    //
    //Path where to copy the file
    let destination:string = `/tracker/minutes/v/copies/`;
    //
    // Extract the file name from the full path
    const filename = full_name.substring(full_name.lastIndexOf("/") + 1);
    //
    // Construct the destination path with the file name to the destination folder
    const destinationpath:string = destination + filename;
    //
    // Call the server to copy the file
    const ok:boolean = await server.exec("path", [full_name, true], "copy", [destinationpath]);
    //
    // Log a success message with the source and destination paths
    if (ok) alert("successfully   copied"); 
    else alert(`Failed to copy file ''${full_name}' to file '${destinationpath}'`);
}
