
const Ticket = require("../../models/ticket.model");
const getTicketPrice = require("./getTicketPrice");

const newTicket = async (req, res) => {
    const ticketData = req.body;
    try {
        // Calculate the ticket price
        ticketData.ticketPrice= await getTicketPrice(ticketData)
        console.log(ticketData);

        // Get seat number

        // Get the bus number

        
        const newTicket = new Ticket(ticketData);
        newTicket.save()
            .then(ticket => {
                res.status(200).json({
                    message: "Ticket created successfully",
                    ticket: ticket
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
