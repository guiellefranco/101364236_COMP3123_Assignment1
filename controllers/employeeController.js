// This file contains the controller functions for handling employee-related operations
const Employee = require('../models/employee');
const mongoose = require('mongoose');

// Get all employees belonging to the logged-in user
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({
            created_by: req.user.userId
        });

        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Add new employee
const addEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email, gender, salary } = req.body;

        if (!first_name || !last_name || !email || !gender ||
            salary === undefined || salary === null) {
            return res.status(400).json({
                message: 'All employee fields are required'
            });
        }

        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            gender,
            salary,
            created_by: req.user.userId
        });

        return res.status(201).json({
            message: 'Employee created successfully',
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Employee email already exists'
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findOne({
            _id: eid,
            created_by: req.user.userId
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Update/Edit employee
const updateEmployee = async (req, res) => {
    try {
        const { eid } = req.params;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const allowedFields = [
            'first_name', 'last_name', 'email', 'gender', 'salary'
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: 'No valid fields provided for update'
            });
        }

        const employee = await Employee.findOneAndUpdate(
            {
                _id: eid,
                created_by: req.user.userId
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        return res.status(200).json({
            message: 'Employee updated successfully',
            employee
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Employee email already exists'
            });
        }

        if (error.name === 'ValidationError' ||
            error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid employee data',
                error: error.message
            });
        }

        return res.status(500).json({
            message: 'Server error'
        });
    }

};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;

        if (!mongoose.isValidObjectId(eid)) {
            return res.status(400).json({
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findOneAndDelete({
            _id: eid,
            created_by: req.user.userId
        });

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        return res.status(200).json({
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};