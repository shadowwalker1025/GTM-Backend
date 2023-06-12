// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
// const employeeController = require('../controllers/employeeController');


// Signup route
router.post('/signup', signupController.signup);

// Login route
router.post('/login', loginController.login);

module.exports = router;
