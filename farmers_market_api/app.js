const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.static('public'));


// Connect to MongoDB
const dbURI = "mongodb+srv://root:root@cluster0.dhxp1uw.mongodb.net/"; // Replace with your connection string
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Other routes can be added similarly...

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;  // This is useful for testing purposes
