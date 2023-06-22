const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/attendanceLogoutController');

// Create logout record
router.post('/', logoutController.createLogout);

// Get all logout records
router.get('/', logoutController.getAllLogout);

// Get logout records by employee ID
router.get('/:employeeId', logoutController.getLogoutByEmployeeId);

// Update logout record by employee ID
router.put('/:employeeId', logoutController.updateLogoutByEmployeeId);

module.exports = router;
