const express = require('express');
const { authenticate } = require('../Middlewares/authMiddleware');
const { registerUser, loginUser, getUserProfile } = require('../Controllers/userControllers');

const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
