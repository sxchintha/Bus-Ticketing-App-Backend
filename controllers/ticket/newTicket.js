
const Ticket = require("../../models/ticket.model");
const User = require("../../models/iUser.model");
const retryOperation = require("../../common/retry");

const newTicket = async (req, res) => {
    const ticketData = req.body;

    try {
        // Calculate the ticket price
        ticketData.ticketPrice= await getTicketPrice(ticketData)


    try {
        // reduce the ticket price from the user's account balance
        if (ticketData.paymentMethod === 'account') {
            const user = await User.findOne({ nic: ticketData.userID });
            // check if the user has enough balance for the ticket
            if (user.accountBalance >= ticketData.ticketPrice) {
                await retryOperation(User.updateOne({ nic: ticketData.userID }, { $inc: { accountBalance: -ticketData.ticketPrice } }), 3);
            } else {
                res.json({
                    error: "Insufficient balance",
                    resCode: 402
                })

                return;
            }
        }

        const newTicket = new Ticket(ticketData);
        newTicket.save()
            .then(async ticket => {
                res.json({
                    message: "Ticket created successfully",
                    resCode: 200,
                    ticket: ticket
                })
            })
            .catch(err => {
                console.log(err.message);
                res.json({
                    message: "Error creating ticket",
                    resCode: 401,
                    error: err
                })
            });

    } catch (error) {
        console.log(error);
        res.json({
            message: "Error creating ticket",
            resCode: 401,
            error: error
        })
    }
};

module.exports = newTicket;
