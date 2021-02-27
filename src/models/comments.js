const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
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

CommentsSchema.index({
    '$**': 'text'
});
const CommentsModel = mongoose.model('comments', CommentsSchema);
module.exports = CommentsModel;