
// array of longitude and latitude
const lonLat = [
    { stationName: 'Ampara', longitude: 81.6747, latitude: 7.3018 },
    { stationName: 'Anuradhapura', longitude: 80.4037, latitude: 8.3114 },
    { stationName: 'Badulle', longitude: 81.0550, latitude: 6.9934 },
    { stationName: 'Colombo', longitude: 79.861244, latitude: 6.927079 },
    { stationName: 'Galle', longitude: 80.2168, latitude: 6.0329 },
    { stationName: 'Gampaha', longitude: 80.0098, latitude: 7.0840 },
    { stationName: 'Hambantota', longitude: 81.1212, latitude: 6.1429 },
    { stationName: 'Jaffna', longitude: 80.0255, latitude: 9.6615 },
    { stationName: 'Kalutara', longitude: 79.9607, latitude: 6.5854 },
    { stationName: 'Kandy', longitude: 80.6337, latitude: 7.2906 },
    { stationName: 'Matara', longitude: 80.5469, latitude: 5.9496 },
    { stationName: 'Aluthgama', longitude: 80.0004, latitude: 6.4346 },
    { stationName: 'Hikkaduwa', longitude: 80.1063, latitude: 6.1395 },
    { stationName: 'Moratuwa', longitude: 79.8913, latitude: 6.7881 },
    { stationName: 'Dehiwala', longitude: 79.8801, latitude: 6.8301 },
    { stationName: 'Panadura', longitude: 79.9074, latitude: 6.7106 },
    { stationName: 'Mathugama', longitude: 80.1137, latitude: 6.5219 },
]

// get longitude and latitude by station name
const getLongitudeLatitude = (stationName) => {
    const station = lonLat.find(station => station.stationName === stationName);
    return ({
        longitude: station.longitude,
        latitude: station.latitude
    });
}

module.exports = getLongitudeLatitude;
