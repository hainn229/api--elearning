const mongoose = require('mongoose');

const RecentsSchema = new mongoose.Schema({
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

RecentsSchema.index({
    '$**': 'text'
});
const RecentsModel = mongoose.model('recents', RecentsSchema);
module.exports = RecentsModel;