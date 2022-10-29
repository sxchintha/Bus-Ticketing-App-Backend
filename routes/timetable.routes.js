const express = require("express");
const createTimetable = require("../controllers/timetable/createTimetable");
const getBusTimesWithRoute = require("../controllers/timetable/getBusTimesWithRoute");

const router = express.Router();

router.post("/createNewTimetable", createTimetable)
router.get("/getBusByRoute", getBusTimesWithRoute)

module.exports = router;