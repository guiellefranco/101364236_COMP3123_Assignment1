// Sets up express server and connects to MongoDB database
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Employee Management API is running!'
    });
});

// User routes
app.use('/api/v1/user', userRoutes);

// Employee routes
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();