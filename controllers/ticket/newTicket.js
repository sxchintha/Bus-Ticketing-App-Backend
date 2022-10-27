
const Ticket = require("../../models/ticket.model");

const newTicket = async (req, res) => {
    const ticketData = req.body;
    try {
        // Calculate the ticket price

        // Get seat number

        // Get the bus number

        
        const newTicket = new Ticket(ticketData);
        newTicket.save()
            .then(bus => {
                res.status(200).json({
                    message: "Ticket created successfully",
                    bus: bus
                })
            })
            .catch(err => {
                console.log(err.message);
                res.status(400).json({
                    message: "Error creating ticket",
                    error: err
                })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating ticket",
            error: error
        })
    }
};

module.exports = newTicket;
