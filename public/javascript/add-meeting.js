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

// const { Meeting } = require("../../models");


//////////////////////////////////////////////
// Places an event listner on new-meeting-form SUBMIT BUTTON
//  on SUBMIT addMeetingHandler 
//  LOADS data from the add-meeting.handlebars form and
//  POSTS the info to the route: /api/meetings 
//  if response  ok RETURNS via 
//  document.location.replace('/dashboard');//

async function addMeetingHandler(event) {
  event.preventDefault();

  const meeting_name = document.querySelector('input[name="meeting-title"]').value.trim();
  const topic = document.querySelector('input[name="meeting-topic"]').value.trim();
  // hard code some test data
  const date = '2021/03/28';
  const start = 9;
  const end = 10;

  // The names below must match the database column names
  // the id of the organizer is the logged-in user's id
  // it is set to req.session.user_id in the route

  const response = await fetch(`/api/meetings`, {
    method: 'POST',
    body: JSON.stringify({
      date,
      start,
      end,
      meeting_name,
      topic
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    console.log(`///////////////////////////`)
    console.log(`///  response OK  /////`)
    console.log(`///////////////////////////`)
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

/////////////////////////////////////////////////
//   date picker 
///////////////////////////////////////////////

$(function () {
  $('#dateTime').ejDateTimePicker({
    interval: 60,
    dateTimeFormat: "M/d/y HH:mm",
    width: '180px',
    value: new Date(),
    timeDrillDown: {
      enabled: true,
      interval: 30,
      showMeridian: false
    },
  });
});

/////////////////////////////////////////////////////
// event listener 
/////////////////////////////////////////////////////
document.querySelector('.add-meeting-form').addEventListener('submit', addMeetingHandler);