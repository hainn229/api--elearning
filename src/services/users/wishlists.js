const CoursesModel = require('../../models/courses');
const WishlistModel = require('../../models/wishlists');

module.exports.createWishlist = async (courseId, userId) => {
    const course = await CoursesModel.findOne({_id: courseId});
    const newWishlist = new WishlistModel({
        user_id: userId,
        course_id: course._id
    });
    return newWishlist.save();
};
