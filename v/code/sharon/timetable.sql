/*

The days represents the results I want to export. The description is done using
Typescript data types

type days = Array<Iday>;

type Iday = {
    name:string,
    interns:Array<Iintern>
}

type Iintern = {
    intern:number,
    name:string,
    photo:string,
    university:string,
    year:string,
    presenter:boolean
    presentations: Array<Ipresentation>;
}

type Ipresentation ={
    presentation: number;
    date: string
}
For the presenter:
//
// 1. Extract the maximum presentation day for all interns
//
// 2. Extract the minimum presentation date from the interns
//
// 3. Get the intern number of the presenter

Extraction of the the raw data from the following fields :-
intern,intern
intern.day
intern.surname
intern.image
intern.university
intern.qualification    
intern.year

We shall summarize the presentations by json encoding 
*/

with
    # 1.extract the raw data,including the day code which represents the days of the week
    
    raw as(
        select
            intern.intern,
            intern.day,
            CASE day
                WHEN 'Monday' THEN 1
                WHEN 'Tuesday' THEN 2
                WHEN 'Wednesday' THEN 3
                WHEN 'Thursday' THEN 4
                WHEN 'Friday' THEN 5
            END as day_code,
            intern.name,
            intern.surname,
            intern.image,
            intern.university,
            intern.qualification,
            intern.year
        from
            intern  
            order by day_code
    ),
    #
    # 2. Get the maximum presentation date for all interns from the presentation dates
    # to get the most recent presentation for all interns in a day
    max_presentation as (
        select
            raw.day_code,
            raw.intern,
            max(presentation.date) as date
        from 
            raw
            inner join presentation on presentation.intern = raw.intern
        group by raw.day_code, raw.intern
        order by raw.day_code
    ),
    #
    # 3. Get the minimum presentation dates from the max_presentation to get the 
    # presenter with the earliest day within a day as the next presenter
    min_presentation as (
        select
            max_presentation.day_code,
            min(max_presentation.date) as date
        from 
            max_presentation
        group by max_presentation.day_code
    ), 
    #
    # 4.Get the next presenter surname 
    next_presenter as (
        select
            min_presentation.day_code,
            max_presentation.intern
        from   
            min_presentation
            inner join max_presentation on min_presentation.day_code = max_presentation.day_code 
            and min_presentation.date = max_presentation.date
    ),
    #
    # 5. Get all interns with presentations and their presentation dates
    presentation as (
        select
            intern,
            json_arrayagg(json_object('presentation',presentation,'date',date)) as presentations
        from
            presentation
        group by intern
    ),
    # 6. Add the presenter andpresentation dates to the raw data
    raw_2 as (
        select
            raw.intern,
            raw.day,
            raw.day_code,
            raw.surname,
            raw.name,
            raw.image,
            raw.university,
            raw.qualification,
            raw.year,
            case when next_presenter.intern is not null then true else false end as is_presenter,
            presentation.presentations
        from
            raw
            left join next_presenter on next_presenter.intern = raw.intern
            left join presentation on presentation.intern = raw.intern
        order by day_code
    ),
    #
    # 6. Summarize the intern
    #
    # Package intern details as follows
    # intern ={intern:number,surname:string, image:string, university:string, year:string,
    # is_presenter:boolean}
    intern as(
        select
            raw_2.day_code,
            raw_2.day as day_name,
            json_object('name',name,'surname',surname,'image',image,'qualification',qualification,
            'university',university,'year',year,'presenter',is_presenter,'presentations',presentations) as intern
        from
            raw_2
        order by day_code
    ),
    #
    # 7. Summarize the day
    #
    # Package day details as follows
    # day ={name:string,interns:Array<intern>}
    day as(
        select
            day_code,
            day_name,
            json_arrayagg(intern) as interns
        from
            intern
        group by day_code,day_name
        order by day_code
    )   
    select * from day;


