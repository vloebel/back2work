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

  const meeting_id = event.target.dataset.meeting;
  const user_id = event.target.dataset.participant;
  const statusText = event.target.dataset.status;


  // console.log(`old button status text: ${statusText}`);
  // console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);


  //   CAUTION: ///////////////////////////////////
  //   data - status in the html is only picking up the first word
  //   of "Not Sure" which works fine but might be unexpected for anyone
  //   updating this code
  ///////////////////////////////////////////////////////////
  // toggle the "accepted" flag through three states
  //      Accepted -> Declined -> Not Sure
  //   convert back to boolean and store in the database
  //   default "Not Sure" = null

  let accepted = null;
  if (statusText == "Accepted") accepted = false;
  else if (statusText == "Not") accepted = true;


  // console.log(`NOW accepted: ${accepted}`);
  // console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);


  //////////////////////////////////////////////////
  //  UPDATE "accepted" flag status in the db
  // user id and meeting id go in the query string
  // PUT api/participants/?user=id&meeting=id
  // accepted goes in the body

  const response = await fetch(`/api/participants?user=${user_id}&meeting=${meeting_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      accepted
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    console.log(`response.statusText: ${response.statusText}`);
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}




// add an event listener to the parent element 
// containing the handlebars template
document.querySelector('#accept-button-nanny').addEventListener('click', toggleMeetingHandler);


