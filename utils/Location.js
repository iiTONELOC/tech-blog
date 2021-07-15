const extIP = require("ext-ip")();
const geoip = require('geoip-lite');

// GRABS CORDS BASED OFF IP
class Location {
    static async user(req) {

        const client = req.clientIp
        if (client === '::1' || client === '::ffff:127.0.0.1') {
            const response = await extIP.get().then(ip => {
                const locationData = geoip.lookup(ip)
                const lat = locationData.ll[0];
                const lon = locationData.ll[1];
                const city = locationData.city;
                const state = locationData.region;
                const data = {
                    city: city,
                    state: state,
                    lat: lat,
                    lon: lon,
                }
                return data
            }, err => {
                console.log(err);
                return
            }).catch(e => {
                console.log(e)
                return
            })
            return response
        } else {
            const ip = geoip.lookup(client);
            const data = {
                city: ip.city,
                state: ip.region,
                lat: ip.ll[0],
                lon: ip.ll[1],
            }
            return data
        }
    }
}


module.exports = Location;