const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE ,
  port: process.env.DB_PORT || 3306,
});

// For Render, use a different approach to handle the connection
if (process.env.RENDER) {
  const createConnection = async () => {
    try {
      await db.promise().query('SELECT 1');
      console.log('Connected to the database');
      if (db.config.connectionConfig) {
        console.log('MySQL Server Host:', db.config.connectionConfig.host);
        console.log('MySQL Server Port:', db.config.connectionConfig.port);
      }
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
      if (db.config.connectionConfig) {
        console.log('MySQL Server Host:', db.config.connectionConfig.host);
        console.log('MySQL Server Port:', db.config.connectionConfig.port);
      }
    }
  });
}

module.exports = db;
