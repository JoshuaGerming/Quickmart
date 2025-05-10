// backend/controllers/productController.js
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const data = { ...req.body, createdBy: req.user.id };
  const product = await Product.create(data);
  res.status(201).json(product);
};
