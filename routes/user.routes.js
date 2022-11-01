const express = require("express");
const reloadAccount = require("../controllers/userAccount/reloadAccount");

const router = express.Router();

router.post("/reloadAccount", reloadAccount);

module.exports = router;