const express = require('express');
const app = express();
const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',     // MySQL database host
  user: 'your_username', // MySQL database username
  password: 'your_password', // MySQL database password
  database: 'your_database', // MySQL database name
});

// Middleware for parsing JSON requests
app.use(express.json());

// Define your API endpoints and routes here

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
