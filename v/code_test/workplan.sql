/*
The workplan represents an intern workplan for an year, which has the following 
structure:
Iworkplan = {
    intern:number;
    items: Array<Iproject>;
}

where:-
Iproject = {
    name:string;
    problem:string;
    plan:string;
    outcome:string;
}
Extract the raw data from the following:-lkm

*/
with
    #
    # 1. Extract the data
    raw as(
        select
            workplan.intern,
            project.name,
            project.problem,
            project.plan,
            project.outcome
        from
            project
            inner join workplan on workplan.workplan = project.workplan
    ),
    #
    # Package the project name, problem , plan and outcome in a json object as 
    # shown below:-
    # {name:string,problem:string,plan:string,outcome:string}
    project as(
        select
            raw.intern,
            json_object('name',name,'problem',problem,'plan',plan,'outcome',outcome) as project
        from
            raw
    ),
    #
    # 2.2 Summarize i.e json_encode, workplan by grouping using the intern
    # as follows :-
    # { intern:string, workplan: Array<Iproject>}
    workplan as(
        select
            intern,
            json_arrayagg(project) as workplan
        from 
            project
       group by intern
    )
    select * from workplan;
