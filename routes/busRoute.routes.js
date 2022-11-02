const express = require("express");
const addNewBusRoute = require("../controllers/busroute/busRoute")

const router = express.Router();

router.post("/addNewBusRoute", addNewBusRoute); // Add new Bus Route
// router.get("/getRoute", getRouteByStartAndDestination)

module.exports = router;