const bcrypt = require('bcrypt');
const db = require('../config/db');

const registerUser = (req, res) => {
  const { name, email, password, dob, gender, state, country, phone } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `INSERT INTO users (name, email, password, dob, gender, state, country, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'user')`;
  db.query(query, [name, email, hashedPassword, dob, gender, state, country, phone], (err, result) => {
    if (err) throw err;
    res.status(201).send('User registered');
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(401).send('Invalid email or password');
    
    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid email or password');
    
    res.status(200).json({ role: user.role });
  });
};

module.exports = { registerUser, loginUser };
