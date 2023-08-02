/*
 The data that will be retrieved should satisfy the following types:- 
 
 *Intern presentation which has the presentation pk and an agenda
 presentation = {
 presentation: number,
 agenda: Array<project>
 }
 
 *Project which are composed of intern project alongside the 
 presentation minutes
 project = {
 name: string,
 plan: string,
 minutes: Array<minute>,
 outcome: string,
 problem: string,
 project: number
 }
 
 *Minutes which are all minutes from a particular project
 minute = {
 detail: string,
 numeral: number,
 summary: string,
 contributions: Array<contribution>,
 minute: number,
 }
 
 *Finally Contribution from other interns
 contribution = {
 content: string,
 contributor: string
 }
 
 1. First Fetch the fields below as raw minutes:-
 presentation.presentation
 project.project
 minute.minute
 minute.number
 minute.summary
 minute.detail
 
 1.1 Raw minutes from the database should satisfy the conditions
 that:-  
 inter.surname = "Intern" and presentation.date = "yyyy-mm-dd"
 
 2. After getting the minutes Retrieve the corresponding contributions to the raw minutes.
 Get the following data from the database: -
 minute.minute
 contribution.content
 intern.surname
 
 2.1 Package the contributions to match the defined contributions type
 contribution = {
 content: string,
 contributor: string,
 }
 
 2.2 Since a minute item can lack contributions a need for combining the contributions and
 minutes emerges
 
 2.2.1 The first step is to group the contributions by json encoding 
 
 2.2.2 Combine the encoded contributions with the minutes in that in cases that contributions
 are present you have a json of contributions and in cases that there are no contributions a
 null. 
 
 From Here the result should match the following structure: - 
 minute = {
 detail: string,
 numeral: number,
 summary: string,
 contributions: Array<contribution>,
 minute: number,
 }
 
 3. Combine the minutes with their respective projects the result should 
 satisfy the following structure:-
 project = {
 name: string,
 plan: string,
 minutes: Array<minute>,
 outcome: string,
 problem: string,
 project: number,
 }
 
 4. Combine all data fetched By json encoding into a presentation 
 which matches the following data structure:-
 presentation = {
 presentation: number,
 agenda: Array<project>
 }
 */
WITH #
#Minutes that match the given criteria of inter and date i.e Kangara
minute AS (
    SELECT
        minute.minute,
        project.project,
        minute.number,
        minute.summary,
        minute.detail,
        presentation.presentation
    FROM
        minute
        INNER JOIN project ON minute.project = project.project
        INNER JOIN presentation ON minute.presentation = presentation.presentation
        INNER JOIN intern ON presentation.intern = intern.intern
    WHERE
        presentation.date = :date
        AND intern.surname = :surname
),
#
#Contributions to Kangaras minutes following the structure:-
# { content: string, contributor: string }
contribution AS (
    SELECT
        minute.minute,
        json_arrayagg(
            json_object(
                'content',
                contribution.content,
                'contributor',
                intern.surname
            )
        ) AS contributions
    FROM
        minute
        INNER JOIN contribution ON contribution.minute = minute.minute
        INNER JOIN intern ON contribution.intern = intern.intern
    GROUP BY
        minute.minute
),
#
#Combine minutes and their contributions
# { name: string, plan: string, minutes: Array<minute>, outcome: string, problem: string, project: number} 
discussion AS (
    SELECT
        minute.*,
        contribution.contributions
    FROM
        minute
        LEFT JOIN contribution ON contribution.minute = minute.minute
),
#
#Bring in the project element
myproject AS (
    SELECT
        discussion.project,
        discussion.presentation,
        json_arrayagg(
            json_object(
                'minute',
                discussion.minute,
                'numeral',
                discussion.number,
                'summary',
                discussion.summary,
                'detail',
                discussion.detail,
                'contributions',
                discussion.contributions
            )
        ) AS minute
    FROM
        discussion
    GROUP BY
        discussion.project,
        discussion.presentation
) #
#Fetch data for presentation
# { presentation: number, agenda: Array<project> }
SELECT
    myproject.presentation,
    json_arrayagg(
        json_object(
            'project',
            project.project,
            'name',
            project.name,
            'problem',
            project.problem,
            'plan',
            project.plan,
            'outcome',
            project.outcome,
            'minutes',
            myproject.minute
        )
    ) AS agenda
FROM
    project
    INNER JOIN myproject ON myproject.project = project.project
GROUP BY
    myproject.presentation;
