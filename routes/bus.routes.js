const express = require("express");
const addNewBus = require("../controllers/bus/addNewBus");
const getBusAll = require("../controllers/bus/getBusAll");

const router = express.Router();

router.post("/addNewBus", addNewBus); // Add new Bus
router.get("/getBusAll", getBusAll); // Get all Busses

module.exports = router;