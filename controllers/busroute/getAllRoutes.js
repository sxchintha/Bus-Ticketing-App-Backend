
const BusRoute = require('../../models/busRoute.model');

// get all bus routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await BusRoute.find();
        res.status(200).json({
            message: "All bus routes",
            routes: routes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting bus routes",
            error: error
        })
    }
}

module.exports = getAllRoutes;