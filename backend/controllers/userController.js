// backend/controllers/userController.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getMe = async (req, res) => {
  try {
    const user = await User
      .findById(req.user.id)
      .select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { username, email, firstName, lastName, phone, password } = req.body;

    // Build an updates object only with fields provided
    const updates = { username, email, firstName, lastName, phone };
    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    // If they provided a new password, hash it  
    if (password) {
      const salt       = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    // Find + update with validators
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);

  } catch (err) {
    console.error('updateMe error:', err);

    // If Mongoose validation error, extract messages
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ message: msgs });
    }

    res.status(500).json({ message: 'Failed to update profile' });
  }
};
