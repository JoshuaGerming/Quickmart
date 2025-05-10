// backend/server.js

require('dotenv').config()
const express       = require('express')
const path          = require('path')
const cors          = require('cors')
const connectDB     = require('./config/db')
const authRoutes    = require('./routes/auth')
const productRoutes = require('./routes/productRoutes')

const app = express()

// 1) Connect to MongoDB
connectDB()

// 2) Global middleware
app.use(cors())
app.use(express.json())

// 3) Mount API routes
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)

// 4) Serve React build assets
const buildPath = path.join(__dirname, '../frontend/build')
app.use(express.static(buildPath))

// 5) Catch-all: deliver index.html for any non-API route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

// 6) Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
