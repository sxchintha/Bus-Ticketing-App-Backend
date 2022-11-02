const express = require("express");

const { handleLogin, } = require('../controllers/authController');
const { userSignUp } = require("../controllers/userSignup");

const router = express.Router();

router.post("/login", handleLogin); // User login
router.post("/register", userSignUp); // User registration

module.exports = router;
