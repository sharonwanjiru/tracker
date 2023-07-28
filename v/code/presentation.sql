/*
The intern represents the results I want to export
intern ={
    surname:string
    presentation: Array<presentation>
}

where :- 
 
presentation ={
    presentation:number
    date:string
}
Extract the raw data from the following fields :-
presentation.presentation
intern.surname
presentation.date

We shall summarize the presentations by json encoding 
*/
with
    #
    # 1. Extract the raw data 
    raw as (
        select
            presentation.presentation,
            intern.surname,
            presentation.date 
        from
            presentation
            inner join intern on presentation.intern = intern.intern        
    ),
    #
    # 2. Summarize the presentations
    #
    # 2.1 Package presentation and date as follows
    # {presentation:number,date:string}
    presentation as(
        select 
            json_object('presentation',presentation,'date',date) as presentation,
            surname
        from
            raw
    ),
    #
    # 2.2 Summarize i.e json_encode, presentations by grouping using the surname
    # as follows :-
    # { surname:string, presentations: Array<presentation>}
    intern as(
        select
            surname,
            json_arrayagg(presentation) as presentations
        from
            presentation
        group by surname
    )
    #
    # 3. Export the results
    select * from intern ;