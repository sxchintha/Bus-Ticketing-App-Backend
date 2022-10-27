const express = require("express");

const{handleLogin,}=require('../controllers/authController');
const { userSignUp } = require("../controllers/userSignup");


const router=express.Router();

router.post("/login",handleLogin);
router.post("/register",userSignUp);

module.exports = router;
