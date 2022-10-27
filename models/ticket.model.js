const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketType: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    ticketTime: {
        type: String,
        required: true
    },
    ticketSeat: {
        type: String,
        required: true
    },
    ticketBus: {
        type: String,
    },
    ticketPassenger: {
        type: String,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;