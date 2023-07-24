with
    interns as (
        select
            intern.intern,
            day,
            CASE day
                WHEN 'Monday' THEN 1
                WHEN 'Tuesday' THEN 2
                WHEN 'Wednesday' THEN 3
                WHEN 'Thursday' THEN 4
                WHEN 'Friday' THEN 5
             END as code,
            intern.surname,
            intern.initials ,
            intern.image,
            `work plan`.`link`,
            intern.qualification,
            intern.year,
            intern.university
          
        from intern 
        inner join `work plan` on `work plan`.intern = intern.intern
        order by code
    ),
    compacted as (
            select day, code, json_object(
            'name', surname,'initials', initials,'qualification', 
            qualification,'university', university,'year', year,'image', image, 
            'portfolio',link
        ) as data from interns
    ),
    presentation as (
        select
            interns.code,
            interns.surname,
            max(presentation.date) as date
        from interns
        inner join presentation on presentation.intern = interns.intern
        group by interns.code, interns.surname  
        order by interns.code
    ),
    presenter as (
        select
            presentation.code,
            min(presentation.date) as date
        from presentation
        group by presentation.code
    ),
    next_presenter as (
        select
            presenter.code,
            presenter.date,
            presentation.surname
        from presenter
        inner join presentation on presenter.code = presentation.code and presenter.date = presentation.date
    )
   
select * from next_presenter;


