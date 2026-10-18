
# COMP3123 - Assignment 1

**Student ID:** 101364236

## Employee Management REST API

A REST API built using Node.js, Express.js, and MongoDB Atlas for managing users and employee records.

## Features

- User registration and login
- JWT authentication
- Create employee
- Get all employees
- Get employee by ID
- Update employee
- Delete employee
- Employee ownership authorization
- Error handling and validation

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- Postman
- Vercel

## Installation

1. Clone the repository.
2. Install dependencies:

   npm install

3. Create a `.env` file containing:

   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the server:

   node index.js

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/user/signup | Register a user |
| POST | /api/v1/user/login | Log in |
| GET | /api/v1/emp/employees | Get all employees |
| POST | /api/v1/emp/employees | Create an employee |
| GET | /api/v1/emp/employees/:eid | Get employee by ID |
| PUT | /api/v1/emp/employees/:eid | Update employee |
| DELETE | /api/v1/emp/employees?eid=ID | Delete employee |

Employee endpoints require a Bearer JWT token.

## Deployment

https://101364236-comp-3123-assignment1.vercel.app

## GitHub Repository

https://github.com/guiellefranco/101364236_COMP3123_Assignment1