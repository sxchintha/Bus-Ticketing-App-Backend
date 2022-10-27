const express = require("express");
const addNewBusRoute = require("../controllers/bus/addNewBus");

const router = express.Router();

router.post("/addNewBusRoute", addNewBusRoute);

module.exports = router;