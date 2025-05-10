// backend/controllers/userController.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

exports.updateMe = async (req, res) => {
  const { username, email, firstName, lastName, phone, password } = req.body;
  const updates = { username, email, firstName, lastName, phone };
  if (password) {
    updates.password = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true, runValidators: true
  }).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};
