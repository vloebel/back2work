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

  // ignore clicks that were not on a button
  if (!event.target.closest("button"))
    return;

  //// otherwise....

   // test of write to button
 console.log(`event.target: ${event.target}`);

 console.log(`event.target.innerhtml: ${event.target.innerhtml}`);

  event.target.innerhtml = "I AM a FISH";
 return



  const meeting_id = event.target.dataset.meeting;
  const user_id = event.target.dataset.participant;
  const statusText = event.target.dataset.status;


  // console.log(`old button status text: ${statusText}`);
  // console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);


  //   CAUTION: ///////////////////////////////////
  //   data-status in the html only sends the first word
  //   of "Not Sure" 
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
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

/////////////////////////////////////////////////////////////////
//  CANCEL A MEETING ORGANIZED BY THE CURRENT USER
////////////////////////////////////////////////////////////////


async function cancelMeetingHandler(event) {
  event.preventDefault();

  // ignore clicks that were not on a button
  if (!event.target.closest("button"))
    return;

  //// otherwise....

  const meeting_id = event.target.dataset.meeting;
  // const user_id = event.target.dataset.organizer; //future use
  // console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);


  //////////////////////////////////////////////////
  //   DELETE the meeting
  //  


  const response = await fetch(`/api/meetings/${meeting_id}`, {
    method: 'DELETE',
    body: JSON.stringify({
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


//////////////////////////////////////////////////
// Event Listeners



// add an event listener to the parent div 
// of each handlebars section
document.querySelector('#accept-button-nanny').addEventListener('click', toggleMeetingHandler);

document.querySelector('#cancel-button-nanny').addEventListener('click', cancelMeetingHandler);

