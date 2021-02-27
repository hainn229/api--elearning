const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'courses'
    },
    user_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }]
}, {
    timestamps: true
});

WishlistSchema.index({
    '$**': 'text'
});
const WishlistModel = mongoose.model('wishlist', WishlistSchema);
module.exports = WishlistModel;