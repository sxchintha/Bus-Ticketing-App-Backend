const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busRouteSchema = new Schema({
    routeNumber: {
        type: String,
        required: true
    },
    boardingPoint: {
        type: String,
        required: true
    },
    destinationPoint: {
        type: String,
        required: true
    },
    stations: {
        type: Array,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }

});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);
module.exports = BusRoute;