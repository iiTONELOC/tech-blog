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
        optionalServices: ['battery_service'] // Required to access service later.
    })
        .then(device => {
            console.log(device);
            window.alert('Success')
        })
        .catch(error => { console.error(error); });

    // navigator.permissions.query({ name: "bluetooth" }).then(status => {
    //     if (status.state !== 'denied') checkAvailability();

    //     // Bluetooth is blocked, listen for change in PermissionStatus.
    //     status.onchange = () => {
    //         if (this.state !== 'denied') checkAvailability();
    //     };
    // });
});