const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
        default : 'studying'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        default: Date.now()
    },
    phone: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    authenticated: {
        type: Boolean,
        default: false
    },
    isCollege: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    },
    isDirectorate: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', UserSchema);