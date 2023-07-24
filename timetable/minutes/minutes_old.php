<?php
//
//Get the names of all the folders presenters/interns
$names = ["carol", "james", "kangara", "muli", "mwaniki", "peter", "sharon", "munya"];
//
//Get all the files in the directory
$files = array_diff(scandir("./"), [".", ".."]);
//
//Open the provided file
//
//Read the provided file
function read_file($file_name) {
    //
    //Open the file
    $open_file = fopen($file_name, "a+");
    //
    //Read the contents of the file
    return fread($open_file, 8192);
}
//
//Save the file when the save button is clicked and also use the current resource   
function save_file($file_name) {
    //
    //Open the file
    $open_file = fopen($file_name, "a+");
    //
    //Save the contents to the file
    fwrite($open_file, $file_name);
    //
    //close the file
    fclose($open_file);
}
//
//Add to the selector, all the files for each user in descending form,
//from the most recent to the latest document
//
//Open the selected file
//
//Save to the file when the save button is clicked

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minutes
    </title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

        html {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        body {
            height: 100%;
        }

        #header>label,
        select,
        option,
        h3 {
            font-family: 'Montserrat', sans-serif;
        }

        select {
            height: 30px;
        }

        option {
            font-weight: bold;
            padding: 5px;

        }

        #header>h3 {
            text-align: center;
        }


        @media all and (max-width: 600px) {
            body {
                font-size: 14px;
            }

            #header {
                display: flex;
                flex-direction: column;
            }

            label {
                padding: 2px;
            }

            #editor {
                font-size: 12px;
            }

            .toastui-editor-defaultUI .ProseMirror {
                font-size: 13px;
                padding: 12px 16px;

            }
        }
    </style>
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
</head>

<body>
    <div id="header">
        <h3>Session Minutes</h3>
        <label>
            Presenter :
            <select id="names">
                <option>Select a Presentor</option>
                <?php
                //
                //Create options for each user
                foreach ($names as $name) {
                    //
                    //Add a selector and its options for each user
                    $option = "<option>$name</option>";
                    //
                    //Show the option
                    echo $option;
                }
                ?>
            </select>
        </label>
        <label>
            Documents:
            <select id="files">
                <option>Choose a file to view</option>
            </select>
        </label>
    </div>
    <div id="editor"></div>
    <script async>
        //
        //Describe the editor instance
        let editor;
        //
        //Get the editor section  and create the editor section
        async function get_panel() {
            //
            //Initialize the editor instance
            editor = new toastui.Editor({
                el: document.querySelector('#editor'),
                height: '100%',
                initialEditType: 'wysiwyg',
                previewStyle: 'tab',
                initialValue: "# pick some file to view"
            });
            //
            //Set the markdown in the defined sections
            editor.getMarkdown();
        }
        //
        //Create the editor panel and its constituents.
        get_panel();
        //
        //Get the list of all files in the system
        const files_ = "<?php echo implode(",", $files); ?>";
        //
        //Get the name selector element
        const name_selector = document.getElementById("names");
        //
        //Get the name of the selected user
        name_selector.onchange = async () => {
            //
            //Get the selected name
            const name = name_selector.value;
            //
            //Use the selected name to select the provided file
            await names(name);
        }
        //
        //Get the name of the file from the server
        const names = async (name) => {
            //
            //construct the regular expression to utilize
            const regex = new RegExp(`\\b${name}(\\w*)\\b`, "g");
            //
            //Use the name of the use to filter from the list of all files
            const files = [...files_.match(regex)];
            //
            //Get the document selector
            const doc = document.getElementById("files");
            //
            //If there is no file to associate with the current user, proceed and add the name of the file
            if (files.length === 0) {
                place_data(`# No document to associate with this user or the file name associated with this user is wrongly named`);
                return;
            }
            //
            //remove other elements
            doc.innerHTML = "<option>Choose a file to view</option>"
            //
            //Create an option for each created file
            files.forEach((file) => {
                //
                //Add the option for each available file
                doc.innerHTML += `<option value="${file}.md">${file}.md</option>`;
            });
            //
            //When the option is changed, show the contents of the file
            doc.onchange = async () => {
                const file = doc.value;
                //
                //Open the file
                const file_data = await fetch(`./${file}`);
                //
                //Convert the data to text
                const data = await file_data.text();
                //
                //Add the content to the section
                place_data(data);
            }
        }
        //
        //Get the contents of the markdown file and save them to their respective position
        const place_data = (text) => {
            //
            //create the editor and add text to it
            editor.setMarkdown(text, true);
        }
    </script>
</body>

</html>