import React, { useState, useEffect } from 'react';
import { useNavigate }                from 'react-router-dom';
import api                            from '../services/api';
import { toast }                      from 'react-toastify';
import '../assets/css/SettingsPage.css';

export default function SettingsPage() {
  const [form, setForm]     = useState({
    username: '', email: '', firstName: '', lastName: '', phone: '', password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  // 1) Load user profile on mount
  useEffect(() => {
    api.get('/auth/me')
      .then(({ data }) => {
        setForm({
          username:  data.username  || '',
          email:     data.email     || '',
          firstName: data.firstName || '',
          lastName:  data.lastName  || '',
          phone:     data.phone     || '',
          password:  ''              // always blank
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Settings load error:', err);
        toast.error('Failed to load profile', { position: 'top-center' });
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  // 2) Handle form field changes
  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // 3) Submit updates
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Build payload, drop empty password
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      const { data } = await api.put('/auth/me', payload);
      toast.success('Profile updated!', { position: 'top-center' });

      // Keep form in sync, clear password field
      setForm(f => ({ ...f, password: '' }));

    } catch (err) {
      console.error('Settings update error:', err.response || err);
      const msg = err.response?.data?.message || 'Update failed';
      setError(msg);
      toast.error(`❌ ${msg}`, { position: 'top-center' });
    }
  };

  if (loading) return <p className="settings-loading">Loading…</p>;

  return (
    <div className="settings-page">
      <h1>Your Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        {error && <p className="error">{error}</p>}

        {[
          { name: 'username',  label: 'Username',                  type: 'text',     req: true },
          { name: 'email',     label: 'Email',                     type: 'email',    req: true },
          { name: 'firstName', label: 'First Name',                type: 'text',     req: false },
          { name: 'lastName',  label: 'Last Name',                 type: 'text',     req: false },
          { name: 'phone',     label: 'Phone Number',              type: 'tel',      req: false },
          { name: 'password',  label: 'New Password (leave blank)',type: 'password', req: false }
        ].map(({ name, label, type, req }) => (
          <label key={name}>
            {label}
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required={req}
            />
          </label>
        ))}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
