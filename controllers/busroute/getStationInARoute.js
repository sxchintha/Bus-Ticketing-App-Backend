
const BusRoute = require('../../models/busRoute.model');

async function getStationInARoute(routeNumber, stationName) {
    // find station in the route.stations array
    try {
        const route = await BusRoute.findOne({ routeNumber: routeNumber });

        // if a route is found, return the route, else return error
        if (!route) {
            return {
                error: "No route found"
            }
        } else {
            let station = await route.stations.find(function (station) {
                return station.stationName === stationName;
            })
            return station;
        }
    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

module.exports = getStationInARoute;