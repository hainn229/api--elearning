const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    course_title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginning level', 'Intermediate level', 'Advanced level', 'All levels'],
        default: 'All levels'
    },
    tutor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    cat_id: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    num_of_subscribers: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

CoursesSchema.index({
    '$**': 'text'
});
const CoursesModel = mongoose.model('courses', CoursesSchema);
module.exports = CoursesModel;