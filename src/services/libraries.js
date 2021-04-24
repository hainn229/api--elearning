const LibrariesModel = require("../models/libraries");

module.exports.getLibrary = async (userId, currentPage, limitPage) => {
  const skip = (currentPage - 1) * limitPage;

  const libraries = await LibrariesModel.find({
    user_id: userId,
  })
    .populate({
      path: "course_id",
    })
    .skip(skip)
    .limit(limitPage)
    .sort({
      _id: -1,
    });

  const totalItems = await LibrariesModel.find({
    user_id: userId,
  }).countDocuments();

  return {
    libraries: libraries,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.addToLibrary = async (libraryData) => {
  const data = new LibrariesModel(libraryData);
  const newLibrary = await data.save();
  return await LibrariesModel.findOne({
    _id: newLibrary._id,
  }).populate({
    path: "course_id",
  });
};

module.exports.removeFromLibrary = async (id) => {
  return await LibrariesModel.deleteOne({
    _id: id,
  });
};
