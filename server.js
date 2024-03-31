// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

// Get all employees
app.get('/employees', (req, res) => {
    let sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Add search functionality
app.get('/employees/search', (req, res) => {
    const { name } = req.query;
    let sql = `SELECT * FROM employees WHERE name LIKE '%${name}%'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
