const searchDevicesBtn = document.getElementById('find');

searchDevicesBtn.addEventListener('click', function (event) {
    event.preventDefault();

    function checkAvailability() {
        navigator.bluetooth.getAvailability().then(isAvailable => {
            alert(isAvailable)
        });
    }

    navigator.permissions.query({ name: "bluetooth" }).then(status => {
        if (status.state !== 'denied') checkAvailability();

        // Bluetooth is blocked, listen for change in PermissionStatus.
        status.onchange = () => {
            if (this.state !== 'denied') checkAvailability();
        };
    });
});