const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Registration failed:', err);
      res.status(500).json({ error: 'Registration failed' });
    } else {
      console.log('Registration successful');
      res.json({ message: 'Registration successful' });
    }
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Login failed:', err);
      res.status(500).json({ error: 'Login failed' });
    } else if (result.length > 0) {
      console.log('Login successful');
      res.json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

router.post('/contact-us', (req, res) => {
  const { name, email, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  // Insert contact form data into the database
  const insertQuery = 'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact form data into the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Contact Us form submitted and data saved to the database:', result);

    res.status(201).json({ message: 'Contact Us form submitted successfully' });
  });
});

module.exports = router;

