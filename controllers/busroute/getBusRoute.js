
const BusRoute = require("../../models/busRoute.model")

// get bus route by starting location and destination
const getRouteByStartAndDestination = async (req, res) => {
    const { startLocation, destination } = req.body;
    try {
        BusRoute.find({ 'stations.stationName': { $all: [startLocation, destination] } })
            .then(async route => {
                if (route) {
                    // console.log(route);
                    const startLocationData = await route[0].stations.find(station => station.stationName === startLocation);
                    const destinationData = await route[0].stations.find(station => station.stationName === destination);

                    // console.log(startLocationData);
                    // console.log(destinationData);

                    const distance = Math.abs(destinationData.stationDistance - startLocationData.stationDistance);
                    const ticketPrice = route[0].totalPrice / route[0].distance * distance;

                    // console.log(distance + "km");
                    // console.log("Rs." + ticketPrice);

                    return res.status(200).json({
                        routes: route,
                        distance: distance.toFixed(2),
                        ticketPrice: ticketPrice.toFixed(2)
                    })
                } else {
                    return res.status(400).json({
                        error: "No route found"
                    })
                }
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting route",
            error: error
        })
    }
}

module.exports = { getRouteByStartAndDestination };
