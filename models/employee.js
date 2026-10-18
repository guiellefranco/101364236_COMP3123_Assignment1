// Define the Employee model using Mongoose
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    // Reference to the User model for the creator of the employee record
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;