import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import SubAdminDashboard from './components/SubAdminDashboard';
import UserDashboard from './components/UserDashboard';
// import ForgotPassword from './components/ForgotPassword.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { role } = useContext(AuthContext) || {}; // Default to an empty object if useContext returns undefined

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />  */}
        {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
        {role === 'subadmin' && <Route path="/subadmin" element={<SubAdminDashboard />} />}
        {role === 'user' && <Route path="/user" element={<UserDashboard />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
