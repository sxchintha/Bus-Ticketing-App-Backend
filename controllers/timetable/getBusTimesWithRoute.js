
const Bus = require('../../models/bus.model');
const Timetable = require('../../models/timetable.model');
const { getRouteByStartAndDestination } = require('../busroute/getBusRoute');
const { getTimesInARoute, getTimesInArryOfRoutes } = require('./getTimesInARoute');

// get available buses and times by starting location and destination
const getBusTimesWithRoute = async (req, res) => {
    const { startLocation, destination } = req.body;
    try {
        // get the available routes between the start location and destination
        // with the distance and ticket price
        const routes = await getRouteByStartAndDestination(startLocation, destination)

        // show error if no routes found
        if (routes.error) {
            res.status(400).json({
                error: routes.error
            })
        }
        else {
            // get the available buses and times for each route
            const times = await getTimesInArryOfRoutes(routes.routes, startLocation, destination);
            let busTimes = [];
            times.forEach(time => {
                if (time) {
                    busTimes = [...busTimes, ...time];
                }
            })

            // set ticket prices
            routes.ticketPrice = {
                normal: routes.ticketPrice,
                luxury: (routes.ticketPrice * 1.5).toFixed(2),
                ac: (routes.ticketPrice * 2).toFixed(2),
            }

            // show error if no time found
            if (times.error) {
                res.status(400).json({
                    error: times.error
                })
            } else if (times.length < 1) {
                res.status(200).json({
                    error: "No buses found"
                })
            } else {
                return res.status(200).json({
                    message: "Bus routes found",
                    distance: routes.distance,
                    ticketPrice: routes.ticketPrice,
                    busTimes: busTimes
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBusTimesWithRoute;
