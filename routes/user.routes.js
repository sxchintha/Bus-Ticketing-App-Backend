const express = require("express");
const getFutureTrips = require("../controllers/userAccount/futureBookings");
const getOngoingTrip = require("../controllers/userAccount/ongoingTrip");
const getPreviousTrips = require("../controllers/userAccount/previousTrips");
const reloadAccount = require("../controllers/userAccount/reloadAccount");
const getTodayBookings = require("../controllers/userAccount/todayBookings");

const router = express.Router();

router.post("/reloadAccount", reloadAccount); // Reload account
router.get("/ongoingTrip/:userID", getOngoingTrip); // Get ongoing trip
router.get("/previousTrips/:userID", getPreviousTrips); // Get previous trips
router.get("/futureTrips/:userID", getFutureTrips); // Get future trips
router.get("/todayTrips/:userID", getTodayBookings); // Get today trips

module.exports = router;