/////////////////////////////////////////////////
//            dashboard.js
//   event handlers for dashboard.handlebars
////////////////////////////////////////////////

///////////////////////////////////////////////////////////
//  * toggleMeetingHandler - three-way toggle for a 
//    meeting from accepted to declined to "maybe" 
//    stores the new value in the Particpant table.

async function toggleMeetingHandler(event) {
  event.preventDefault();

  // ignore clicks that were not on a button
  if (!event.target.closest("button"))
    return;

  //// otherwise....

  // test of write to button
  //  event.target.textContent = "I AM a FISH";


  const meeting_id = event.target.dataset.meeting;
  const user_id = event.target.dataset.participant;
  const statusText = event.target.dataset.status;


  // console.log(`old button status text: ${statusText}`);
  // console.log(`meeting id: ${meeting_id} user_id: ${user_id}`);


  //   NOTE: ///////////////////////////////////
  //   data-status in the html only sends the first word
  //   of "Not Sure" 
  ///////////////////////////////////////////////////////////
  // toggle the "accepted" flag through three states
  //      Accepted -> Declined -> Not Sure
  //   convert back to boolean
  //   change the text on the button (avoids page reload)
  //   store new value in database

  let accepted = null;
  if (statusText == "Accepted") {
    accepted = false;
    event.target.dataset.status = "Declined";
    event.target.textContent = "Declined";
  }
  else if (statusText == "Not") {
    accepted = true;
    event.target.dataset.status = "Accepted";
    event.target.textContent = "Accepted";
  }
  else {
    event.target.dataset.status = "Not";
    event.target.textContent = "Not sure";
  }


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
  if (!response.ok) {
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

  //find the div.row this button is in
  // and hide the row to avoid page reload
  // vll: I think it does a page refresh anyway
  //  so this is tbd

  let rowEl = event.target.closest(".row")
  rowEl.style.display = "none";

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

