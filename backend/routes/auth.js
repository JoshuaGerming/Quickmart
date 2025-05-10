// backend/routes/auth.js
const express = require('express');
const router  = express.Router();
const { register, login }     = require('../controllers/authController');
const { getMe, updateMe }     = require('../controllers/userController');
const { protect }             = require('../middleware/authMiddleware');

// all paths here MUST be literal strings, no leading ":" by itself!
router.post('/register', register);
router.post('/login',    login);
router.get('/me',        protect, getMe);
router.put('/me',        protect, updateMe);

module.exports = router;
