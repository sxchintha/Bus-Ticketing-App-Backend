const express = require("express");
const newTicket = require("../controllers/ticket/newTicket");
const scanQrTicket = require("../controllers/ticket/scanQrTicket");

const router = express.Router();

router.post("/new", newTicket); // Create new ticket for booking
router.post("/scan", scanQrTicket); // Create new ticket by scanning QR code

module.exports = router;