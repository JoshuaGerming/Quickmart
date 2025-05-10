// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',             
});

// ————————————————
// Add the JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ————————————————

export default api;
