// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../assets/css/LoginPage.css';

function LoginPage() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setCreds({ ...creds, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', creds);
      localStorage.setItem('token', data.token);

      toast.success('🎉 Login successful!', {
        position: 'top-center',
        autoClose: 2000
      });

      setTimeout(() => navigate('/'), 2200);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(`❌ ${msg}`, {
        position: 'top-center',
        autoClose: 3000
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={creds.username}
            onChange={onChange}
            required
            className="input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={creds.password}
            onChange={onChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Login</button>
        <div className="registration-link">
          <p>
            Don’t have an account? <Link to="/register">Create one here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
