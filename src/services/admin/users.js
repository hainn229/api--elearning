const UsersModel = require('../../models/users');

module.exports.getUsersWithPages = async (currentPage, limitPage, keywords) => {
    const skip = (currentPage - 1) * limitPage;
    const query = UsersModel.find({
        full_name: {
            $regex: keywords
        }
    });

    const docs = await query.skip(skip).limit(limitPage).sort({
        _id: -1
    });
    
    const users = await query.countDocuments();

    return {
        docs: docs,
        currentPage: currentPage,
        totalItems: users,
        limitPage: limitPage
    };
};

module.exports.getUsers = async () => {
    const users = await UsersModel.find();
    return users;
};