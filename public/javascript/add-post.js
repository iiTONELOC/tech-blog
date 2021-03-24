async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post_data = document.querySelector('#post-body').value.trim();
    if (title !='' && post_data !='') {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_data
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
    }else{
        document.getElementById('blank-field-alert').setAttribute('style','visibility: visible;')
        
        
    }

}

document.querySelector('#new-post').addEventListener('click', newFormHandler);