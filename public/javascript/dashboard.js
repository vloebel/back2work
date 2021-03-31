/////////////////////////////////////////////////
//            dashboard.js
/////////////////////////////////////////////////
//  * event handlers for dashboard buttons
//  * On the meetings you're invited to:
//  * Toggle accept - three-way toggle for a 
//    meeting from accepted to declined to "maybe" 
//    and then stores the new value in the Particpant table.
//
///////////////////////////////////////////////////////////
//
//  * On the meetings you've organized
//  * Cancel meeting
//  * Deletes the meeting completely from the
//  * Meetings table
///////////////////////////////////////////////////////////


async function toggleMeetingHandler(event) {
  event.preventDefault();
  const toggleMeetingEl = document.querySelector('#btn-toggle-accept');
  const toggleMeetingText = toggleMeetingEl.value;
  const meetingInfoEl = document.querySelector("#meeting-info");
  const meeting_id = meetingInfoEl.dataset.meeting;
  const user_id = meetingInfoEl.dataset.participant;

  // toggle the "accepted" flag through three states
  //      accepted - declined - uncertain
  //   convert back to boolean
  //   and store in the database

  console.log(`toggle Meeting value: ${toggleMeetingText}`);
  console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);

  let acceptedStatus = null;
  switch (toggleMeetingText) {
    case ("Accepted"):
      acceptedStatus = true;
      break;
    case ("Declined"):
      acceptedStatus = false
      break;
  }
  
  // return //// DON'T POST YET
  
//   const response = await fetch(`/api/participants`, {
//     method: 'PUT',
//     body: JSON.stringify({
//       date,
//       start,
//       duration,
//       meeting_name,
//       topic
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if (response.ok) {
//     document.location.replace('/dashboard');
//   } else {
//     alert(response.statusText);
//   }
// }
  
}


// document.querySelector('#btn-toggle-accept').addEventListener('click', toggleMeetingHandler);
var toggleButtons = document.querySelectorAll("#pickme");
console.log({ toggleButtons });

toggleButtons.forEach((button) => {
  button.addEventListener('click', toggleMeetingHandler())
});
