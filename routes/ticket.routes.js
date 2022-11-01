const express = require("express");
const newTicket = require("../controllers/ticket/newTicket");

const router = express.Router();

router.post("/new",newTicket);

module.exports = router;