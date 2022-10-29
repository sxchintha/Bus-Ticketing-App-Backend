
const Bus = require('../../models/bus.model');
const BusRoute = require('../../models/busRoute.model');
const Timetable = require('../../models/timetable.model');
const { getRouteByStartAndDestination } = require('../busroute/getBusRoute');

// get available buses and times by starting location and destination
const getBusTimesWithRoute = async (req, res) => {
    const { startLocation, destination } = req.body;
    try {
        // get the available routes between the start location and destination
        // with the distance and ticket price
        const routes = await getRouteByStartAndDestination(startLocation, destination)
        console.log(routes);
        return res.status(200).json({
            message: "Bus routes found",
            routes: routes
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBusTimesWithRoute;
