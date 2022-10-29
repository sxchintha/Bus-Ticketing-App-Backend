const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    timetableBus: {
        type: String,
        required: true
    },
    timetableRoute: {
        type: String,
        required: true
    },
    timetableDay: {
        type: Number,
        required: true
    },
    timetableTime: {
        type: String,
        required: true
    },
    timetableStatus: {
        type: String,
    },
});

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;