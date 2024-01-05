const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mol@209',
  database: process.env.DB_DATABASE || 'sell_bike',
  port: process.env.DB_PORT || 3307,
});

// For Render, use a different approach to handle the connection
if (process.env.RENDER) {
  const createConnection = async () => {
    try {
      await db.promise().query('SELECT 1');
      console.log('Connected to the database');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  };

  createConnection();
} else {
  // For local development or non-Render environments
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to the database');
    }
  });
}

module.exports = db;
