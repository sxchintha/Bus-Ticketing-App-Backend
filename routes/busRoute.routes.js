const express = require("express");
const addNewBusRoute = require("../controllers/busroute/busRoute")

const router = express.Router();

router.post("/addNewBusRoute", addNewBusRoute);
// router.get("/getRoute", getRouteByStartAndDestination)

module.exports = router;