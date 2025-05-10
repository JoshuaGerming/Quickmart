// backend/server.js
require('dotenv').config();
const express       = require('express');
const path          = require('path');
const cors          = require('cors');
const connectDB     = require('./config/db');
const authRoutes    = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

// JSON & CORS middleware
app.use(cors());
app.use(express.json());

// ---- Valid API routes ----
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ---- Serve React in production ----
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// ---- Start the server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
