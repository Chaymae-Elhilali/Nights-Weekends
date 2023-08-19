const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['farmer', 'consumer', 'admin'],
        required: true
    },
    location: {
        type: String
    },
    contact: {
        type: String
    },
    
});

module.exports = mongoose.model('User', UserSchema);
