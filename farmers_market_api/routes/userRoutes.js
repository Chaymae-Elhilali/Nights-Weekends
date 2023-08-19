const User = require('../models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// @route   POST /users
// @desc    Register a new user
router.post('/', async (req, res) => {
    const { name, email, password, role, location, contact } = req.body;

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
            location,
            contact
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

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' },
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


function ensureAdmin() {
    return function(req, res, next) {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
    };
}

module.exports = router;


