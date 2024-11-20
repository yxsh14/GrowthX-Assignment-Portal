const User = require('../Models/userModel');

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { adminMiddleware };
