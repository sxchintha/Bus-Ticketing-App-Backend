const express = require("express");
const addNewBusRoute = require("../controllers/busroute/busRoute");
const getAllRoutes = require("../controllers/busroute/getAllRoutes");

const router = express.Router();

router.post("/addNewBusRoute", addNewBusRoute); // Add new Bus Route
router.post("/getAllRoutes", getAllRoutes); // Get all Bus Routes
// router.get("/getRoute", getRouteByStartAndDestination)

module.exports = router;