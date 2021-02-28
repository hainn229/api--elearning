const ContentsModel = require('../../models/contents');

module.exports.getContent = async (courseId) => {
    return await ContentsModel.find({
        courseId: courseId
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

module.exports.findContentByTitle = (title) => {
    return ContentsModel.findOne({
        title: title
    });
};