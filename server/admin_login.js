require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Function to manually enter user details
function enterUserDetails() {
  return {
    name: 'sub_admin', // replace with manual input if needed
    email: 'subadmin@gmail.com', // replace with manual input if needed
    password: 'subadmin@123', // replace with manual input if needed
    dob: '1990-01-01', // replace with manual input if needed
    gender: 'Male', // replace with manual input if needed
    state: 'California', // replace with manual input if needed
    country: 'USA', // replace with manual input if needed
    phone: '1234567890', // replace with manual input if needed
    role: 'admin' // replace with 'subadmin' or other roles if needed
  };
}

// Main function to run the program
async function main() {
  const user = enterUserDetails();

  // Hash the password
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  // Insert user into the database
  const query = `INSERT INTO users (name, email, password, dob, gender, state, country, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [user.name, user.email, hashedPassword, user.dob, user.gender, user.state, user.country, user.phone, user.role];

  db.query(query, values, (err, result) => {
    if (err) throw err;
    console.log('User registered:', result);
    // Close the database connection
    db.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err.stack);
        return;
      }
      console.log('Database connection closed.');
    });
  });
}

// Run the program
main();
