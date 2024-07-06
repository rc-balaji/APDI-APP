const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');

const app = express();

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

User.createTable();

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
