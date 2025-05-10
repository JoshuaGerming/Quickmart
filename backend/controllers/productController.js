const Product = require('../models/Product');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products  (protected)
exports.createProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const p = new Product({ title, description, price, imageUrl, createdBy: req.user.id });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product' });
  }
};
