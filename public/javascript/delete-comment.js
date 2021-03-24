

async function commentFormHandler(event) {
    event.preventDefault();
    const post_id = document.querySelector('#delete').getAttribute('data-post')
    const user_id = document.getElementById('delete').getAttribute('data-user-id')
    const comment_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_id) {
        console.log(user_id)
        const response = await fetch(`/api/comments/${comment_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/view-comment/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#delete').addEventListener('click', commentFormHandler);