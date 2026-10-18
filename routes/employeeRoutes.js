// Connect employee controller functions to routes
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

// All employee routes require authentication
// Protects all five employee endpoints
router.use(authMiddleware);

// Get all employees
router.get('/employees', getEmployees);

// Add new employee
router.post('/employees', addEmployee);

// Get employee by ID
router.get('/employees/:eid', getEmployeeById);

// Update/Edit employee
router.put('/employees/:eid', updateEmployee);

// Delete employee
router.delete('/employees', deleteEmployee);

module.exports = router;