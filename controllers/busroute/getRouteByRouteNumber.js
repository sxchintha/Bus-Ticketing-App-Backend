
const BusRoute = require('../../models/busRoute.model');

async function getRouteByRouteNumber(routeNumber) {
    try {
        const route = await BusRoute.findOne({ routeNumber: routeNumber });
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