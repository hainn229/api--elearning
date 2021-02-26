const CategoriesModel = require('../../models/categories');

module.exports.getCategoriesWithPages = async (currentPage, perPage, keywords) => {
    const categories = await CategoriesModel.countDocuments();
    const skip = (currentPage - 1) * perPage;

    const docs = await CategoriesModel.find({
        cat_name: {
            $regex: keywords
        }
    }).skip(skip).limit(perPage).sort({
        _id: -1
    });

    return {
        docs: docs,
        currentPage: currentPage,
        totalItems: categories,
        perPage: perPage
    };
};

module.exports.getCategories = async () => {
    return await CategoriesModel.find({}, ['_id', 'cat_name'])
};

module.exports.addCategory = (catName) => {
    const newCategory = new CategoriesModel(catName);
    return newCategory.save();
};

module.exports.detailsCategory = (catId) => {
    return CategoriesModel.findById(catId);
};

module.exports.updateCategory = async (catId, dataUpdate) => {
    return CategoriesModel.updateOne({
        _id: catId
    }, dataUpdate);
};

module.exports.deleteCategory = (catId) => {
    return CategoriesModel.deleteOne({
        _id: catId
    });
};

module.exports.findCategoryByName = (catName) => {
    return CategoriesModel.findOne({
        cat_name: catName
    });
};