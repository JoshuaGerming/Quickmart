// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  email:      { type: String },
  phone:      { type: String },
  firstName:  { type: String },
  lastName:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
