const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Add employee route
router.post('/add', employeeController.addEmployee);

// Get list of employees route
router.get('/', employeeController.getAllEmployees);

// Get employee by ID route
router.get('/:id', employeeController.getEmployeeById);

// Update employee route
router.put('/:id', employeeController.updateEmployee);

module.exports = router;
