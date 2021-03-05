const mongoose = require('mongoose');

const WishlistsSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'courses'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

WishlistsSchema.index({
    '$**': 'text'
});
const WishlistsModel = mongoose.model('wishlists', WishlistsSchema);
module.exports = WishlistsModel;