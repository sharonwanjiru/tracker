/*

The days represents the results I want to export. The description is done using
Tyoescript data types

type days = Array<Iday>;

type Iday = {
    name:string,
    interns:Array<Iintern>
}

type Iintern = {
    intern:number,
    surname:string,
    photo:string,
    university:string,
    year:string,
    presenter:number|null
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
    # 1.extract the raw data,including the day code
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
            intern.surname,
            intern.image,
            intern.university,
            intern.qualification,
            intern.year
        from
            intern
    ),
    #
    # 2. Get the maximum presentation date for all interns
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
    # 3. Get the minimum presentation dates from the maximum
    min_presentation as (
        select
            max_presentation.day_code,
            min(max_presentation.date) as date
        from 
            max_presentation
        group by max_presentation.day_code
    ), 
    #
    # 4.Get the next presenterr surname and assign boolean values
    next_presenter as (
        select
            min_presentation.day_code,
            max_presentation.intern
        from   
            min_presentation
            inner join max_presentation on min_presentation.day_code = max_presentation.day_code 
            and min_presentation.date = max_presentation.date
    ),

    # 5. Add the presenter to the raw data
    raw_2 as (
        select
            raw.intern,
            raw.day,
            raw.day_code,
            raw.surname,
            raw.image,
            raw.university,
            raw.qualification,
            raw.year,
            max_presentation.intern as is_presenter
        from
            raw
            left join max_presentation on max_presentation.intern = raw.intern
    ),
    #
    # 6. Summarize the intern
    #
    # Package intern details as follows
    # intern ={intern:number,surname:string, image:string, university:string, year:string,
    # is_presenter:boolean}
    intern as(
        select
            day_code,
            day as day_name,
            json_object('intern',surname,'surname',surname,'image',image,'university',university,
            'year',year,'presenter',is_presenter) as intern
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
            json_arrayagg(intern)
        from
            intern
        group by day_code,day_name
    )   
    select * from day;


