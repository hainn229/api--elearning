const WishlistsModel = require('../models/wishlists');

module.exports.getWishlist = async (userId, currentPage, limitPage) => {
    const skip = (currentPage - 1) * limitPage;

    const wishlists = await WishlistsModel
        .find({
            user_id: userId
        })
        .populate({
            path: 'courses'
        })
        .skip(skip)
        .limit(limitPage)
        .sort({
            _id: -1
        });

    const totalItems = await WishlistsModel.find({
        user_id: userId
    }).countDocuments();

    return {
        wishlists: wishlists,
        currentPage: currentPage,
        totalItems: totalItems
    };
};

module.exports.addToWishlist = async (wishlistData) => {
    const data = new WishlistsModel(wishlistData);
    const newWishlist = await data.save()
    return await WishlistsModel.findOne({
        _id: newWishlist._id
    }).populate({
        path: 'courses'
    });
};

module.exports.removeFromWishlist = async (id) => {
    return WishlistsModel.deleteOne({
        _id: id
    });
};