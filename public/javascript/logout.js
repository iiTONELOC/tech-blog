async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log("You have been logged out");
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.getElementById('logout').addEventListener('click', logout);