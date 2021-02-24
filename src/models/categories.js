const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    cat_name: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
});

CategoriesSchema.index({
    '$**': 'text'
});
const CategoriesModel = mongoose.model('categories', CategoriesSchema);
module.exports = CategoriesModel;