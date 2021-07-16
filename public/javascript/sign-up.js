

async function signupFormHandler(event) {
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    event.preventDefault();
    if (username && email && password) {
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition((data) => getSendFullData(data), sendBasicData);
        }
        else {
            sendBasicData()
        }
    }
}

document.querySelector('#sign-up').addEventListener('click', signupFormHandler);


function FormHandler(event) {

    if (event.code === "Enter") {
        myFunction()
        async function myFunction() {
            const username = document.querySelector('#username-signup').value.trim();
            const email = document.querySelector('#email-signup').value.trim();
            const password = document.querySelector('#password-signup').value.trim();
            event.preventDefault();
            if (username && email && password) {
                if (navigator.geolocation) {
                    navigator.geolocation
                        .getCurrentPosition((data) => getSendFullData(data), sendBasicData);
                }
                else {
                    sendBasicData()
                }
            }
        }

    } else { return }

}
(document).addEventListener('keydown', FormHandler);

async function getSendFullData(data) {
    const { latitude, longitude } = await data.coords
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            email,
            password,
            latitude,
            longitude
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    }
}

async function sendBasicData() {
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    }
}