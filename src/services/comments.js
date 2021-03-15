const CommentsModel = require('../models/comments');

module.exports.getComments = async (courseId, currentPage, limitPage) => {
    const skip = (currentPage - 1) * limitPage;
    const comments = await CommentsModel
        .find({
            course_id: courseId
        })
        .populate({
            path: 'user_id'
        })
        .skip(skip)
        .limit(limitPage)
        .sort({
            _id: -1
        });

    const totalItems = await CommentsModel.find({
        course_id: courseId
    }).countDocuments();

    return {
        comments: comments,
        currentPage: currentPage,
        totalItems: totalItems
    };
};

module.exports.addComment = async (commentData) => {
    const data = new CommentsModel(commentData);
    const newComment = await data.save()
    return await CommentsModel.findOne({
        _id: newComment._id
    }).populate({
        path: 'user_id'
    });
};

module.exports.updateComment = async (id, dataUpdate) => {
    const updateComment = await CommentsModel.updateOne({
        _id: id
    }, dataUpdate);
    return await CommentsModel.findOne({
        _id: updateComment._id
    }).populate({
        path: 'user_id'
    });
};

module.exports.deleteComment = (id) => {
    return CommentsModel.deleteOne({
        _id: id
    });
};