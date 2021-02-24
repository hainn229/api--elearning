const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    point: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 1
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

ReviewsSchema.index({
    '$**': 'text'
});
const ReviewsModel = mongoose.model('courses', ReviewsSchema);
module.exports = ReviewsModel;