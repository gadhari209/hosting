const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST ||bpihkezkqzqabr8yvjeq-mysql.services.clever-cloud.com,
  user: process.env.DB_USER ||ude5vjakckgkhsvv ,
  password: process.env.DB_PASSWORD||WWAUoCIyIAmZEuHb75EU ,
  database: process.env.DB_DATABASE ||bpihkezkqzqabr8yvjeq,
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
