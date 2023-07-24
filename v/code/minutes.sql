select 
    intern.surname as surname,
    json_arrayagg(
        json_object(
            'date', presentation.date,
            'presentation',presentation.presentation,
            'file', file.name
        )
    ) as details
from 
    presentation
    inner join intern on intern.intern = presentation.intern
    inner join file on file.file = presentation.`file`
group by surname ;