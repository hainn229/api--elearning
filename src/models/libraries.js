const mongoose = require('mongoose');

const LibrariesSchema = new mongoose.Schema({
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

LibrariesSchema.index({
    '$**': 'text'
});
const LibrariesModel = mongoose.model('libraries', LibrariesSchema);
module.exports = LibrariesModel;