
const TempTicket = require("../../models/tempTicket.model");

// get the ongoing trip of the user
const getOngoingTrip = async (req, res) => {
    try {
        const tempTicket = await TempTicket.findOne({ userID: req.params.userID });

        if (tempTicket) {
            res.json({
                message: "Ongoing trip fetched successfully",
                resCode: 200,
                ongoingTrip: tempTicket
            })
        } else {
            res.json({
                message: "No ongoing trip for this user",
                resCode: 200,
                ongoingTrip: null
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error fetching ongoing trip",
            resCode: 401,
            error: error
        })
    }
}

module.exports = getOngoingTrip;