async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-body').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace(`/view-comment/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }else{
        document.getElementById('blank-field-alert').setAttribute('style','visibility: visible;');     
        
    }
}

document.querySelector('#post-comment').addEventListener('click', commentFormHandler);