const postLocation = async (location) => {
    const { latitude, longitude } = await location;
    const response = await fetch('/api/users/updateLocation', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude })
    })

    if (response.ok) {
        console.log(response)
    } else {
        const d = await response.json();
        console.log(d)
    }
}


function runUpdate() {
    // set for 1 min for now
    setInterval(() => {
        console.log('Updating location')
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition((data) => postLocation(data), postLocation);
        }
        else {
            postLocation()
        }
    }, 60000);
}

runUpdate();