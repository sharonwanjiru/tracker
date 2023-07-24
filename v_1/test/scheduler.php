<?php
//
//Resolve the reference to the database
require_once '../../../schema/v/code/schema.php';
//
//The scheduler is responsible for creating jobs that are repetitive and those
//that are not repetitive.
class scheduler
{
    //
    //Server address
    const server = "206.189.207.206";
    //server password
    const pwd = "mutall";
    //
    //user name
    const user = "mutall";
    //
    //port
    const port = 22;
    //
    //This is the file that generates the crontab commands that contain valid
    //crontab files
    const crontab_data_file = "mutall_data_crontab.txt";
    //
    //The crontab command with the file for refreshing a crontab file
    const crontab_command = "/home/mutall/project/refresh_cronfile.sh";
    //The messenger file responsible for sending emails and text messages to all
    //users.
    const messenger = "messenger.php";
    //
    //The shell file for 
    //
    //The database object that allows for retrieving queried data
    private $database;
    //
    //The connection resource to the server.i.e.,the foundation running other
    //ssh2 commands once the connection to the server is established
    public $connection;
    //
    //THe connection to the database
    public $db;
    //
    //The recursion associated with an event
    public $recursion;
    //
    //The pk of a job
    public $pk;
    //
    //The message of a job
    public $message;
    //
    //The start date of a crontab event
    public $start_date;
    //
    //The end date of an event, and on this date, the event should be removed
    //from the database
    public $end_date;
    //
    //The start date associated with at jobs
    public $at_date;
    //
    //The start time of the at event
    public $at_time;
    //
    //The minute of a cronjob,
    public $min;
    //
    //The hour of a cronjob
    public $hr;
    //
    //The day of the month of a cronjob
    public $dom;
    //
    //The month associated with a cronjob
    public $month;
    //
    //The day of the week associated with a cronjob
    public $dow;
    //
    //constructor
    function __construct()
    {
        //
        //Establish a connection to the database
        $this->database = new database();
        //
        //Establish a connection to the server
        $this->connection = $this->initialize();
    }
    //
    //This function establishes a connection to the server enabling the scheduling
    //of jobs to our server
    private function initialize()
    {
        //
        //Create the connection to the server to allow us to run a command laterTRY CATCH
        try {
            $this->connect = ssh2_connect(self::server, self::port);
            //
            //Authenticate the user who is logging using the username and password
            try {
                $this->authenticate = ssh2_auth_password(
                    $this->connect,
                    self::user,
                    self::pwd
                );
            } catch (Exception $ex) {
                //
                //Throw an error if no connection to the database is obtained
                throw new Exception($ex . "Could not authenticate user.Invalid password"
                    . "or username");
            }
        } catch (Exception $e) {
            //
            //Throw an e
            throw new Exception($e . "Could not connect to the server. Invalid domain"
                . "or port number");
        }
    }
    //
    //Creating at jobs that only need the filename and the time of execution as
    public function at(string $file)
    {
    }
    //
    //Create cron jobs using the file as the only parameter to the execution of
    //the cronjob.
    public function crontab(string $file): bool
    {
        //
        //Create the crontab file at the current directory
        $this->create_cronfile();
        //
        //Update the current crontab with cron commands
        $this->update_cronfile();
        //
        //Create the crontab on the day the event is set to start using the at command
        $create_at = ssh2_exec($this->connection, "at -f $file $this->start_date");
        //
        //Create the crontab file on the condition that the crontab is successfully
        //created
        if ($create_at !== 'false') {
            //
            //Create the crontab entry for this user
            ssh2_exec($this->connection, "crontab " . self::crontab_data_file);
        }
        //
        //Remove the crontab when the end_date is due.
        return ssh2_exec($this->connection, "at -f  $file  $this->end_date");
    }
    //
    //Executing the crontab at the specific time using the at command.
    //The at command requires the date and the time
    public function exec()
    {
        //
        //Create the at jobs
        $this->at();
        //
        //Create the cron jobs
        $this->crontab();
    }
    //
    //Refreshing the cronfile with the newly created crontab. This method runs a
    //query that extracts all jobs that are active. i.e jobs started earlier than 
    //today and end later than today. start_date<job>end_date
    public function update_cronfile()
    {
        //
        //2. The query that gets all the current jobs that are younger than the start date
        //and younger than the end date
        $sql = 'select '
            . 'job.job,'
            . 'job.msg,'
            . 'job.recursion->>"$.repetitive" as repetitive,'
            . 'recursion->>"$.start_date" as start_date,'
            . 'recursion->>"$.end_date" as end_date,'
            . 'recursion->>"$.frequency" as frequency '
            . 'from job '
            . 'where repetitive="yes" '
            . 'and start_date<= now()< end_date';
        //
        //3. Run the query and return the results
        $jobs = $this->database->get_sql_data($sql);
        //
        //Initialize the entries
        $entries = "";
        //
        //Compile the command to execute
        $command = self::crontab_command;
        //
        //4. Loop over each job, extracting the frequency as part of the entry.
        foreach ($jobs as $job) {
            //
            //Get the frequency of the job
            $freq = $job->frequency;
            //
            //The crontab entry for sending messages
            $entry = "$freq $command $job->job\n";
            //
            //Add it to the list of entries
            $entries .= "$entry";
        }
        //
        //5. Create a cron file that contains all crontab entries.
        file_put_contents(self::crontab_data_file, $entries);
    }
}
