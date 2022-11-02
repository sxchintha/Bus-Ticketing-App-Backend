
const Bus = require('../../models/bus.model');

// get the bus by bus number
async function getBusByBusNumber(busNumber) {
    try {
        const bus = await Bus.findOne({ busNumber: busNumber })
            .then(bus => {
                // if a bus is found, return the bus, else return error
                if (bus) {
                    return bus;
                } else {
                    return {
                        error: "No bus found"
                    }
                }
            })
        return bus;

    } catch (error) {
        console.log(error);
        return {
            error: error
        }
    }
}

module.exports = getBusByBusNumber;