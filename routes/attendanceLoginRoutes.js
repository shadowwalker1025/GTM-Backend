const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceLoginController');

// Create attendance record
router.post('/', attendanceController.createAttendance);

// Get all attendance records
router.get('/', attendanceController.getAllAttendance);

// Get attendance records by employee ID
router.get('/:employeeId', attendanceController.getAttendanceByEmployeeId);

// Update attendance record by ID
router.put('/:employeeId', attendanceController.updateAttendanceByEmployeeId);

module.exports = router;
