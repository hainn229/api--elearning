const WishlistsModel = require("../models/wishlists");

module.exports.getWishlist = async (userId) => {
  const wishlists = await WishlistsModel.find({
    user_id: userId,
  })
    .populate({
      path: "course_id",
    })
    .sort({
      _id: -1,
    });

  const totalItems = await WishlistsModel.find({
    user_id: userId,
  }).countDocuments();

  return {
    wishlists: wishlists,
    totalItems: totalItems
  };
};

module.exports.findCourseInWishlist = async (userId, courseId) => {
  const course = await WishlistsModel.findOne({
    user_id: userId,
    course_id: courseId,
  }).populate({
    path: "course_id",
  });

  return {
    course: course,
  };
};

module.exports.addToWishlist = async (wishlistData) => {
  const data = new WishlistsModel(wishlistData);
  const newWishlist = await data.save();
  return await WishlistsModel.findOne({
    _id: newWishlist._id,
  }).populate({
    path: "course_id",
  });
};

module.exports.removeFromWishlist = (userId, courseId) => {
  return WishlistsModel.deleteOne({
    user_id: userId,
    course_id: courseId,
  });
};
