const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketType: {
        type: String,
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    ticketFrom: {
        type: String,
        required: true
    },
    ticketTo: {
        type: String,
        required: true
    },
    ticketStatus: {
        type: String,
    },
    ticketDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    ticketTime: {
        type: String,
        required: true
    },
    ticketSeat: {
        type: String,
    },
    ticketBus: {
        type: String,
        required: true
    },
    ticketPassenger: {
        type: String,
    },
    routeNumnber: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;