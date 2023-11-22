const express = require('express');
const router = express.Router();

const authenticationController = require('../../controllers/authenticationController');

router.post("/signUp", authenticationController.signUp);
router.post("/login", authenticationController.logIn);
router.post("/forgot-pass", authenticationController.forgotPass);


module.exports= router;