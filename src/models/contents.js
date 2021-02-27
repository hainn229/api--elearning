const mongoose = require('mongoose');

const ContentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    }, 
    course_id: {
        type: mongoose.Types.ObjectId,
        ref: 'courses'
    }
}, {
    timestamp: true
});

ContentsSchema.index({
    '$**': 'text'
});
const ContentsModel = mongoose.model('contents', ContentsSchema);
module.exports = ContentsModel;