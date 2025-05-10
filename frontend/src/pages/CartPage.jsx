// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import '../assets/css/CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cart.map(({ id, title, price, quantity, imageUrl }) => (
          <li key={id} className="cart-item">
            <img src={imageUrl} alt={title} className="cart-img" />
            <div className="cart-details">
              <h3>{title}</h3>
              <p>Qty: {quantity}</p>
              <p>Subtotal: ${(price * quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              className="btn-remove"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <h2>Total: ${total.toFixed(2)}</h2>
        <button onClick={clearCart} className="btn-clear">
          Clear Cart
        </button>
      </div>
    </div>
  );
}
