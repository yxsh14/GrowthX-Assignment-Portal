const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');


const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, isAdmin, adminSecret } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Ensure only authorized users can register as admins
        if (isAdmin && adminSecret !== process.env.ADMIN_SECRET) {
            return res.status(403).json({ message: 'Invalid admin secret' });
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: isAdmin || false, // Default to regular user
        });

        if (user) {
            const token = generateToken(user.id, user.isAdmin);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token, // Include the token in the response body
                message: "Successful SignIn"
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user.id, user.isAdmin);
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token, // Include the token in the response body
                message: "Login Successful"
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

        return res;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Profile (Protected)
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
