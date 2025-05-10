// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/RegistrationPage.css';

function RegistrationPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);

      toast.success('🎉 Registration successful!', {
        position: 'top-center',
        autoClose: 3000
      });

      // Delay to let user read the toast, then redirect
      setTimeout(() => navigate('/login'), 3500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(`❌ ${msg}`, {
        position: 'top-center',
        autoClose: 5000
      });
    }
  };

  return (
    <div className="registration-container">
      {/* One global ToastContainer per app is fine here */}
      <ToastContainer />

      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="registration-form">
        {[
          { name: 'username', label: 'Username', type: 'text', req: true },
          { name: 'password', label: 'Password', type: 'password', req: true },
          { name: 'email',    label: 'Email',    type: 'email',    req: true },
          { name: 'phone',    label: 'Phone Number (Optional)', type: 'tel', req: false },
          { name: 'firstName',label: 'First Name', type: 'text', req: true },
          { name: 'lastName', label: 'Last Name',  type: 'text', req: true }
        ].map(({ name, label, type, req }) => (
          <label key={name}>
            {label}
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={onChange}
              required={req}
            />
          </label>
        ))}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
