const ContentsModel = require('../models/contents');

module.exports.getContent = async (courseId) => {
    return await ContentsModel.find({
        course_id: courseId
    });
};

module.exports.addContent = async (contentData) => {
    const newContent = new ContentsModel(contentData);
    return await newContent.save();
};

module.exports.detailsContent = (id) => {
    return ContentsModel.findById(id);
};

module.exports.updateContent = async (id, dataUpdate) => {
    return ContentsModel.updateOne({
        _id: id
    }, dataUpdate);
};

module.exports.deleteContent = (id) => {
    return ContentsModel.deleteOne({
        _id: id
    });
};
