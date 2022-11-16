
const Bus = require('../../models/bus.model');

// get all busses and send response
const getBusAll = async (req, res) => {
    try {
        const busses = await Bus.find();
        res.status(200).json({
            message: "All busses",
            busses: busses
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting busses",
            error: error
        })
    }
}

module.exports = getBusAll;