
const { NORMAL_BUS, LUXURY_BUS, AC_BUS } = require('../../common/TicketPrices');
const { getRouteByStartAndDestination } = require('../busroute/getBusRoute');
const { getTimesInArryOfRoutes } = require('./getTimesInARoute');

// function to compare the string times in busTimes array and sort them
const compare = (a, b) => {
    if (a.arivalTimeOnStart < b.arivalTimeOnStart) {
        return -1;
    }
    if (a.arivalTimeOnStart > b.arivalTimeOnStart) {
        return 1;
    }
    return 0;
}

// get only the times after now
const getTimesAfterNow = (times) => {
    const now = new Date();
    const timesAfterNow = times.filter(time => {
        const timeArr = time.arivalTimeOnStart.split(':');
        const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeArr[0], timeArr[1]);
        return timeDate > now;
    });
    return timesAfterNow;
}

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

            busTimes = getTimesAfterNow(busTimes);
            busTimes.sort(compare)
            // console.log(busTimes.sort(compare));


            // set ticket prices
            routes.ticketPrice = {
                normal: (routes.ticketPrice * NORMAL_BUS).toFixed(2),
                luxury: (routes.ticketPrice * LUXURY_BUS).toFixed(2),
                ac: (routes.ticketPrice * AC_BUS).toFixed(2),
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
