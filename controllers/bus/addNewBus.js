
const Bus = require("../../models/bus.model");

// add new bus to the system
const addNewBus = async (req, res) => {
    const { busNumber, busType, busCapacity } = req.body;
    try {
        // check if the bus number already exists
        Bus.findOne({ busNumber: busNumber })
            .then(bus => {
                if (bus) {
                    return res.status(400).json({
                        message: "Bus already registered"
                    })
                } else {
                    const newBus = new Bus({
                        busNumber,
                        busType,
                        busCapacity,
                    });

                    // save the new bus details
                    newBus.save()
                        .then(bus => {
                            res.status(200).json({
                                message: "New bus added successfully",
                                bus: bus
                            })
                        })
                        .catch(err => {
                            console.log(err.message);
                            res.status(400).json({
                                message: "Error adding new bus",
                                error: err
                            })
                        });
                }
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error adding new bus",
            error: error
        })
    }
};

module.exports = addNewBus;
