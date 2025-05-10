// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationBar    from './components/common/Header/NavBar';
import ProtectedRoute   from './components/common/ProtectedRoute';
import HomePage         from './pages/HomePage';
import ProductPage      from './pages/ProductPage';
import CartPage         from './pages/CartPage';
import LoginPage        from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <NavigationBar />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/products"   element={<ProductPage />} />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductPage createMode />
            </ProtectedRoute>
          }
        />
          <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
            }
          />
        <Route path="/cart"       element={<CartPage />} />
        <Route path="/login"      element={<LoginPage />} />
        <Route path="/register"   element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
