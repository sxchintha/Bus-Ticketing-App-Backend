const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema({
    busNumber: {
        type: String,
        required: true
    },
    busType: {
        type: String,
        required: true
    },
    busCapacity: {
        type: Number,
        required: true
    },
    busStatus: {
        type: String,
    },
    busLocation: {
        type: String,
    },
});

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;