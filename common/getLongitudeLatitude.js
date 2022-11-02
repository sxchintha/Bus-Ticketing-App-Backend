
// array of longitude and latitude
const lonLat = [
    { stationName: 'Colombo', longitude: 79.861244, latitude: 6.927079 },
    { stationName: 'Panadura', longitude: 79.9074, latitude: 6.7106 },
    { stationName: 'Kalutara', longitude: 79.9607, latitude: 6.5854 },
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
