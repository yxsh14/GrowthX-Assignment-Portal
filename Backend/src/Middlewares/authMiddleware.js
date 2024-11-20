const jwt = require('jsonwebtoken');
const User = require('../Models/userModel'); // Adjust the path to match your project structure

// Middleware to protect routes
const authenticate = async (req, res, next) => {
    // Check for the token in headers, body, or query
    const token = req.header('Authorization') || req.params.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object (excluding password)
        req.user = await User.findById(decoded.id).select('-password');

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ message: 'Not authorized, token invalid or expired' });
    }
};

module.exports = { authenticate };
