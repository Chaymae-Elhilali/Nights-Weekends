const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    category: {
        type: String,
        enum: ['vegetables', 'fruits', 'dairy', 'meat'], // you can extend this list
        required: true
    },
    // Any other details you might want like "date added", "expiry date", etc.
});

module.exports = mongoose.model('Product', ProductSchema);
