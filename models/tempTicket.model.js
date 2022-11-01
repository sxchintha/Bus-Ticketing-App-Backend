const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempTicketSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    startStation: {
        type: String,
        required: true
    },
    busNumber: {
        type: String,
        required: true
    },
});

const TempTicket = mongoose.model("TempTicket", tempTicketSchema);
module.exports = TempTicket;