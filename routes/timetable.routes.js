const express = require("express");
const createTimetable = require("../controllers/timetable/createTimetable");
const getBusTimesWithRoute = require("../controllers/timetable/getBusTimesWithRoute");

const router = express.Router();

router.post("/createNewTimetable", createTimetable) // Create new timetable
router.post("/getBusByRoute", getBusTimesWithRoute) // Get bus times with route

module.exports = router;