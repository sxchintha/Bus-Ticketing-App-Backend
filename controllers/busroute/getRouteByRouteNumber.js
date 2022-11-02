
const BusRoute = require('../../models/busRoute.model');

// get the bus route by route number
async function getRouteByRouteNumber(routeNumber) {
    try {
        const route = await BusRoute.findOne({ routeNumber: routeNumber });

        // if a route is found, return the route, else return error
        if (!route) {
            return {
                error: "No route found"
            }
        } else {
            return route
        }
    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

module.exports = getRouteByRouteNumber;