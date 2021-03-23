



function FormHandler(event) {

    if (event.code === "Enter") {
        myFunction()
        async function myFunction() {
            const email = document.querySelector('#email-login').value.trim();
            const password = document.querySelector('#password-login').value.trim();
            if (email && password) {
                const response = await fetch('/api/users/login', {
                    method: 'post',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert(response.statusText);
                }
            }
        }

    } else { return }

}



(document).addEventListener('keydown', FormHandler);

async function loginFormHandler(event) {

    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#submit').addEventListener('click', loginFormHandler);



