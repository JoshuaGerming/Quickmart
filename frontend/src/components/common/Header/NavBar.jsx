// src/components/common/Header/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart }          from '../../../context/CartContext';
import { useTheme }         from '../../../context/ThemeContext';
import '../../../assets/css/NavBar.css';

export default function NavBar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const token = localStorage.getItem('token') || '';

  const itemCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">QuickMart</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {token ? (
          <>
            <li><Link to="/cart">Cart ({itemCount})</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {/* Simple toggle button */}
        <li>
          <button onClick={toggleTheme} className="btn-theme">
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
