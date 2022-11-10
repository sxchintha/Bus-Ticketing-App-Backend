
const Ticket = require('../../models/ticket.model');

// get the previous trips of the user
const getPreviousTrips = async (req, res) => {
    try {
        // get the tickets before the current date
        const tickets = await Ticket.find({ userID: req.params.userID, ticketDate: { $lt: new Date() } });

        if (tickets.length > 0) {
            res.json({
                message: "Previous trips fetched successfully",
                resCode: 200,
                previousTrips: tickets
            })
        } else {
            res.json({
                message: "No previous trips",
                resCode: 200,
                previousTrips: null
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error fetching previous trips",
            resCode: 401,
            error: error
        })
    }
}

module.exports = getPreviousTrips;