async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="meeting-title"]').value.trim();
    const topic = document.querySelector('textarea[name="meeting-topic"]').value.trim();
    const date = 2021 / 03 / 28
    const start = 9
    const end = 10
    const organizer = req.session.user_id
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
// Submit a post and then return to dashboard
document.querySelector('.new-meeting-form').addEventListener('submit', newFormHandler);