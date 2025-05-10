// src/pages/ProductPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate }             from 'react-router-dom';
import api                               from '../services/api';
import { toast }                         from 'react-toastify';
import ProductCard                       from '../components/product/ProductCard';
import '../assets/css/ProductPage.css';

export default function ProductPage({ createMode = false }) {
  const [products, setProducts] = useState([]);
  const [form, setForm]         = useState({
    title: '', description: '', price: '', imageUrl: ''
  });
  const [error, setError]       = useState('');
  const navigate                = useNavigate();
  const token                   = localStorage.getItem('token');

  // 1) fetch products on mount
  useEffect(() => {
    api.get('/products')
       .then(res => setProducts(res.data))
       .catch(err => console.error('Failed to load products:', err));
  }, []);

  // 2) if we're in createMode but no token, bounce to login
  useEffect(() => {
    if (createMode && !token) {
      navigate('/login', { replace: true });
    }
  }, [createMode, token, navigate]);

  // 3) form change handler
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 4) submit new product
  const handleCreate = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/products', form);
      toast.success('Product created!', { position: 'top-center' });
      // prepend new product to list
      setProducts([res.data, ...products]);
      // reset form
      setForm({ title: '', description: '', price: '', imageUrl: '' });
      // optionally navigate back to list:
      navigate('/products', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create product';
      setError(msg);
      toast.error(`❌ ${msg}`, { position: 'top-center' });
    }
  };

  return (
    <div className="product-page">
      <header className="product-header">
        <h1>Our Products</h1>
        {!createMode && token && (
          <Link to="/products/new" className="btn-new">
            + New Product
          </Link>
        )}
      </header>

      {createMode ? (
        <form onSubmit={handleCreate} className="product-form">
          {error && <p className="error">{error}</p>}

          <label>
            Title
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image URL
            <input
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Create Product</button>
        </form>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
