const db = require('../config/db');

const User = {
  createTable: () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      dob DATE NOT NULL,
      gender VARCHAR(50),
      state VARCHAR(255),
      country VARCHAR(255),
      phone VARCHAR(15),
      role ENUM('admin', 'subadmin', 'user') DEFAULT 'user'
    )`;

    db.query(query, (err, result) => {
      if (err) throw err;
      console.log('Users table created');
    });
  }
};

module.exports = User;
