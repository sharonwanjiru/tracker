# Textbook System
1. [ ] Add functionalities to the text book system, to get something working to present to potential users
2. [ ] upload to the server the school system
3. [ ] look at how nemis system works
4. [x] change from textbook to school research
5. [x] other ideas , fees transport, exam, lunch

# Chama
1. [x] Load the beneficiaries to the system.
2. [x] Add a data list to help us do searches.
3. [x] Add start date to every member.
4. [] Add a column selector.
5. [] Add the rest of the data.
6. [x] Add the crown section.
7. [] Add a button for showing detailed and non detailed output

# shule
1. [] Redesign the showing of regions to take care of empty cases.,  
this retaining the orientation region when there is no data in the body.
2. [] Expand the drop areas for accepting dragged factors,  
so that dropping to empty regions become meaningful. For instance, 
- crest and crumb factors can be dropped in the header topmost row.
- header/crumb and body/crest areas are candidates for drop points
- body/label is a natural drop point for crest factors
- body/ crumb can never be a drop point as it is ambiguous.
- filters is a drop point for crown factors  
2.1. []In this regard, color code the worksheet to show the type of factors  
(crown, crest or crumb) can be dropped there.
3. [] Complete the  'edit-score' option by implementing the save method using the questionnaire library
4. [] Add option for creating and capturing new exam results by extending the 'edit-score' option
5. [] Add the left and bottom margin summaries,  
thus extending the worksheet. Consider extending the the base and crest ctes to achieve this
6. [] Hide user-selected factor levels from display,  
allowing users to focus on what matters at the time.  
Consider using checkboxes for filter.select options
7. [] Review header styling using  multi-technology approach,  
including, detail/summary,  grid area+display flex, fieldset, etc.
8. [] Consider the fact that students graduate from one grade to another  
after an year by creating new progressions.
9. [] Try and display chama and oritech data by creating matching  
base ctes and re-using the sheet and query.ts libraries