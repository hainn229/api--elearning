const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student', 'tutor'],
        default: 'student'
    },
    avatarUrl: {
        type: String
    }
}, {
    timestamps: true
});

UsersSchema.index({
    '$**': 'text'
}); // search
const UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;
