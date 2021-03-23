

async function commentFormHandler(event) {
    event.preventDefault();
    const comment_text = document.querySelector('#post').value.trim();
    const user_id = document.getElementById('update').getAttribute('data-user-id')
    const comment_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        console.log(user_id)
        const response = await fetch(`/api/comments/${comment_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment_text,
                user_id,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#update').addEventListener('click', commentFormHandler);