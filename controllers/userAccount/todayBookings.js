
const Ticket = require('../../models/ticket.model');

// get today's bookings of the user
const getTodayBookings = async (req, res) => {
    try {
        // get the tickets of the current date
        const tickets = await Ticket.find({ userID: req.params.userID });

        if (tickets.length > 0) {
            // filter the tickets of the current date
            const currentDate = new Date();
            const todayTickets = tickets.filter(ticket => {
                const ticketDate = new Date(ticket.ticketDate);

                return ticketDate.getDate() === currentDate.getDate() &&
                    ticketDate.getMonth() === currentDate.getMonth() &&
                    ticketDate.getFullYear() === currentDate.getFullYear();
            });

            res.json({
                message: "Today's bookings fetched successfully",
                resCode: 200,
                todayBookings: todayTickets
            })
        } else {
            res.json({
                message: "No bookings for today",
                resCode: 200,
                todayBookings: null
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error fetching today's bookings",
            resCode: 401,
            error: error
        })
    }
}

module.exports = getTodayBookings;