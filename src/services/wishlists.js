const WishlistsModel = require("../models/wishlists");

module.exports.getWishlist = async (userId) => {
  const wishlists = await WishlistsModel.find({
    user_id: userId,
  })
    .populate({
      path: "course_id",
      populate: { path: "tutor_id" },
    })
    .populate({
      path: "course_id",
      populate: { path: "cat_id" },
    })
    .sort({
      _id: -1,
    });

  const totalItems = await WishlistsModel.find({
    user_id: userId,
  }).countDocuments();

  return {
    wishlists: wishlists,
    totalItems: totalItems,
  };
};

module.exports.findWishlist = async (wishlistData) => {
  try {
    return await WishlistsModel.findOne(wishlistData)
  } catch (error) {
    throw error;
  }
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

module.exports.removeFromWishlist = (id) => {
  return WishlistsModel.deleteOne({
    _id: id,
  });
};
