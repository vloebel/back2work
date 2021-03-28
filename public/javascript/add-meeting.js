//////////////////////////////////////////////
//  add-meeting.js
//////////////////////////////////////////////
//
// CONTROL FLOW: 
// dashboard-routes ->
//   dashboard.handlebars ->
//    add-meeting.handlebars ->
//      add-meeting.js
//////////////////////////////////////////////

const { Meeting } = require("../../models");


//////////////////////////////////////////////
// Places an event listner on new-meeting-form SUBMIT BUTTON
//  on SUBMIT addMeetingHandler 
//  LOADS data from the add-meeting.handlebars form and
//  POSTS the info to the route: /api/meetings 
//  if response  ok RETURNS via 
//  document.location.replace('/dashboard');//

async function addMeetingHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="meeting-title"]').value.trim();
  const topic = document.querySelector('textarea[name="meeting-topic"]').value.trim();
  // hard code some test data
  const date = '2021/03/28';
  const start = 9;
  const end = 10;
  const organizer = req.session.user_id;
    const response = await fetch(`/api/meetings`, {
        method: 'POST',
        body: JSON.stringify({
            date,
            start,
            end,
            title,
            topic,
            organizer
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
/////////////////////////////////////////////////////
// event listener 
/////////////////////////////////////////////////////
document.querySelector('.add-meeting-form').addEventListener('submit', addMeetingHandler);