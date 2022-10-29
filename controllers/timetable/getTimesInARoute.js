
const Timetable = require('../../models/timetable.model');
const getBusByBusNumber = require('../bus/getBusByBusNumber');

// function to return the time and the bus number of the times
async function getTimesAndBuses(times) {
    // wait until all the bus numbers are found
    let timesAndBuses = await Promise.all(
        times.map(async time => {
            let bus = await getBusByBusNumber(time.timetableBus);
            // if there is no error, return the time and the bus number
            if (!bus.error) {
                return ({
                    timeFormStart: time.timetableTime,
                    route: time.timetableRoute,
                    bus: bus,
                })
            }
        })
    )
    console.log(timesAndBuses);
    return timesAndBuses;
}

// get bus times by route number
async function getTimesInARoute(routeNumber) {
    try {
        const times = await Timetable.find({ timetableRoute: routeNumber })
            .then(async times => {
                if (times) {
                    // the getTimesAndBuses function returns an array of bus times and bus objects
                    const timesArray = await getTimesAndBuses(times);
                    return timesArray;
                } else {
                    return {
                        error: "No bus found in the route"
                    }
                }
            })

        return times;

    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

// get bus times of array of route numbers
async function getTimesInArryOfRoutes(routes) {
    try {
        const times = await Promise.all(routes.map(async route => {
            // getTimesInARoute returns an array of bus times and bus objects in the route
            let time = await getTimesInARoute(route);
            if (!time.error) {
                return time;
            }
        }))
        return times;
    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

module.exports = { getTimesInARoute, getTimesInArryOfRoutes };