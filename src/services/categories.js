const CategoriesModel = require('../models/categories');

module.exports.getCategoriesWithPages = async (currentPage, limitPage, keywords) => {
    const skip = (currentPage - 1) * limitPage;
    const query = CategoriesModel.find({
        cat_name: {
            $regex: keywords
        }
    });

    const docs = await query.skip(skip).limit(limitPage).sort({
        _id: -1
    });
    
    const categories = await query.countDocuments();

    return {
        docs: docs,
        currentPage: currentPage,
        totalItems: categories,
        limitPage: limitPage
    };
};

module.exports.getCategories = async () => {
    return await CategoriesModel.find({}, ['_id', 'cat_name'])
};

module.exports.addCategory = async (catName) => {
    const newCategory = new CategoriesModel(catName);
    return await newCategory.save();
};

module.exports.detailsCategory = (id) => {
    return CategoriesModel.findById(id);
};

module.exports.updateCategory = async (id, dataUpdate) => {
    return CategoriesModel.updateOne({
        _id: id
    }, dataUpdate);
};

module.exports.deleteCategory = (id) => {
    return CategoriesModel.deleteOne({
        _id: id
    });
};

module.exports.findCategoryByName = (catName) => {
    return CategoriesModel.findOne({
        cat_name: catName
    });
};