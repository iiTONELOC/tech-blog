function addPostHandler(event) {
    event.preventDefault();

    document.location.replace('/dashboard/add-post');
}

document.querySelector('#add-post').addEventListener('click', addPostHandler);