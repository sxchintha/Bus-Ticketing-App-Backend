const express = require("express");
const addNewBusRoute = require("../controllers/bus/addNewBus");
const { getRouteByStartAndDestination } = require("../controllers/busroute/getBusRoute");

const router = express.Router();

router.post("/addNewBusRoute", addNewBusRoute);
router.get("/getRoute", getRouteByStartAndDestination)

module.exports = router;