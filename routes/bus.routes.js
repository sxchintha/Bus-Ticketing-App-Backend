const express = require("express");
const addNewBus = require("../controllers/bus/addNewBus");

const router = express.Router();

router.post("/addNewBus", addNewBus); // Add new Bus

module.exports = router;