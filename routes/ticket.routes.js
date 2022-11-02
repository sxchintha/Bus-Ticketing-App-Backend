const express = require("express");
const newTicket = require("../controllers/ticket/newTicket");
const scanQrTicket = require("../controllers/ticket/scanQrTicket");

const router = express.Router();

router.post("/new", newTicket);
router.post("/scan", scanQrTicket);

module.exports = router;