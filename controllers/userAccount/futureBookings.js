
const Ticket = require('../../models/ticket.model');

// get the future trips of the user
const getFutureTrips = async (req, res) => {
    try {
        // get the tickets after the current date
        const tickets = await Ticket.find({ userID: req.params.userID, ticketDate: { $gt: new Date() } });

        if (tickets.length > 0) {
            res.json({
                message: "Future trips fetched successfully",
                resCode: 200,
                futureTrips: tickets
            })
        } else {
            res.json({
                message: "No future trips for this user",
                resCode: 200,
                futureTrips: null
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error fetching future trips",
            resCode: 401,
            error: error
        })
    }
}

module.exports = getFutureTrips;