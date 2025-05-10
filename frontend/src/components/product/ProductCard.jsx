// src/components/product/ProductCard.jsx

import React from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id:       product._id || product.id,
      title:    product.title,
      price:    product.price,
      imageUrl: product.imageUrl
    });
  };

  return (
    <div className="product-card">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-image"
        />
      )}
      <h3 className="product-title">{product.title}</h3>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="btn-add" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
}
