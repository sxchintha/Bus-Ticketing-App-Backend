
const Timetable = require('../../models/timetable.model');
const getBusByBusNumber = require('../bus/getBusByBusNumber');
const getRouteByRouteNumber = require('../busroute/getRouteByRouteNumber');
const getStationInARoute = require('../busroute/getStationInARoute');

// function to return the time and the bus number of the times
async function getTimesAndBuses(times, startLocation, destination) {
    // wait until all the bus numbers are found
    let timesAndBuses = await Promise.all(
        times.map(async time => {
            let bus = await getBusByBusNumber(time.timetableBus);

            // find the start location and destination stations' data in the route
            // let start = await getStationInARoute(time.timetableRoute, startLocation);
            // let end = await getStationInARoute(time.timetableRoute, destination);
            let routeDetail = await getRouteByRouteNumber(time.timetableRoute);

            let start = await routeDetail.stations.find(function (station) {
                return station.stationName === startLocation;
            })
            let end = await routeDetail.stations.find(function (station) {
                return station.stationName === destination;
            })


            // calculate the arrival time of the bus at start location and destination
            const timeFromBegin = new Date(1970, 01, 01, time.timetableTimeH, time.timetableTimeM);
            let tempDate
            let arrivalAtStart
            let arrivalAtEnd
            // check whether the bus is going up or down
            if (start.stationTime < end.stationTime) {
                tempDate = new Date(timeFromBegin.getTime() + start.stationTime * 60000);
                arrivalAtStart = tempDate.getHours() + ":" + tempDate.getMinutes();

                tempDate = new Date(timeFromBegin.getTime() + end.stationTime * 60000);
                arrivalAtEnd = tempDate.getHours() + ":" + tempDate.getMinutes();
            } else {
                tempDate = new Date(timeFromBegin.getTime() + (routeDetail.totalTime - start.stationTime) * 60000);
                arrivalAtStart = tempDate.getHours() + ":" + tempDate.getMinutes();

                tempDate = new Date(timeFromBegin.getTime() + (routeDetail.totalTime - end.stationTime) * 60000);
                arrivalAtEnd = tempDate.getHours() + ":" + tempDate.getMinutes();
            }

            // if there is no error, return the time and the bus number
            if (!bus.error) {
                return ({
                    timeFromBegin: time.timetableTimeH + ':' + time.timetableTimeM,
                    arivalTimeOnStart: arrivalAtStart,
                    arivalTimeOnDestination: arrivalAtEnd,
                    route: time.timetableRoute,
                    bus: bus,
                })
            }

        })
    )
    // console.log(timesAndBuses);
    return timesAndBuses;
}

// get bus times by route number
async function getTimesInARoute(routeNumber, startLocation, destination) {
    try {
        const times = await Timetable.find({ timetableRoute: routeNumber })
            .then(async times => {
                if (times) {
                    // the getTimesAndBuses function returns an array of bus times and bus objects
                    const timesArray = await getTimesAndBuses(times, startLocation, destination);
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
async function getTimesInArryOfRoutes(routes, startLocation, destination) {
    try {
        const times = await Promise.all(routes.map(async route => {
            // getTimesInARoute returns an array of bus times and bus objects in the route
            let time = await getTimesInARoute(route, startLocation, destination);
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