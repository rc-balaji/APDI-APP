import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const { setRole } = useContext(AuthContext);
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    setRole(data.role);
    if (data.role === 'admin') history('/admin');
    else if (data.role === 'subadmin') history('/subadmin');
    else if (data.role === 'user') history('/user');
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {/* <button type="button" className="btn btn-link" onClick={() => history('/forgot-password')}>Forgot Password</button> */}
        <button type="button" className="btn btn-link" onClick={() => history('/signup')}>Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
