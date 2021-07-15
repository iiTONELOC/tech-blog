const searchDevicesBtn = document.getElementById('find');

searchDevicesBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // function checkAvailability() {
    //     navigator.bluetooth.getAvailability().then(isAvailable => {
    //         return isAvailable
    //     });
    // }

    // const isAvail = checkAvailability();

    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,

    })
        .then(device => {
            console.log(device);
            window.alert('Success')
        })
        .catch(error => { console.error(error); });


});