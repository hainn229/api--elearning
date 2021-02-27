const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    avatarUrl: {
        type: String
    },
    googleId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

UsersSchema.index({
    '$**': 'text'
}); // search
const UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;