const User = require('../models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// @route   POST /users
// @desc    Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /users/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, "aaaa", { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// @route   PUT /users/:id
// @desc    Update user details
router.put('/:id', async (req, res) => {
    const { name, role, location, contact } = req.body;

    const userFields = {};
    if (name) userFields.name = name;
    if (role) userFields.role = role;
    if (location) userFields.location = location;
    if (contact) userFields.contact = contact;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// @route   DELETE /users/:id
// @desc    Delete a user
router.delete('/:id', ensureAdmin(), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndRemove(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /users
// @desc    Get all users
router.get('/', ensureAdmin(), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
    }
});

// @route   GET /users/:id
// @desc    Get a user
router.get('/:id', ensureAdmin(), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch (error) {
        console.error(error.message);
    }
});




function ensureAdmin() {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    try {
      const JWT_SECRET = "aaaa";
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
      if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. Not an admin.');
      }
      next();
    } catch (err) {
      return res.status(400).send('Invalid token.');
    }
  };
}





module.exports = router;


