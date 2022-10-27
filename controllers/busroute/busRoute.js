const BusRoute = require("../../models/busRoute.model")

const addNewBusRoute = async (req, res) => {
    const formData = req.body;
    console.log(formData)

    const busRoute = new BusRoute(formData); 
            busRoute.save() 
                    .then(request => {
                        res.status(201).json({
                            message: "Route created successfully",
                            request: request
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error creating route",
                            error: err
                        })
                    })
            }
        
module.exports = { addNewBusRoute };
