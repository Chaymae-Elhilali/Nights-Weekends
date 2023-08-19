const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const dbURI = "mongodb+srv://root:root@cluster0.dhxp1uw.mongodb.net/"; // Replace with your connection string
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// JWT Middleware: Decodes the JWT token and attaches user to the request object
app.use((req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Failed to authenticate token", err);
        res.status(401).send('Invalid token');
    }
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Other routes can be added similarly...

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;  // This is useful for testing purposes
