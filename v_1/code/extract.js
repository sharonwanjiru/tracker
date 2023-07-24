import { server } from "./../../../schema/v/code/schema.js";
const sql = "select intern.surname,project.name, project.problem,project.plan, \n\
            project.outcome from project\n\
            join `work plan` ON project.`work plan` = `work plan`.`work plan` \n\
            join intern ON `work plan`.intern = intern.intern\n\
            where `work plan`.`work plan` = 6";
server.exec("database", { "tracker_mogaka":  }, { get_sql, : .data }, { sql });
