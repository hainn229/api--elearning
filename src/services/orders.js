const OrdersModel = require("../models/orders");

module.exports.getOrders = async (currentPage, limitPage, keywords) => {
  const orders = await OrdersModel.find()
    .skip((currentPage - 1) * limitPage)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .populate({ path: "user_id" });
  const totalItems = await OrdersModel.find().countDocuments();

  return {
    docs: orders,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.getOrdersSuccess = async (currentPage, limitPage, keywords) => {
  const orders = await OrdersModel.find({ status: true })
    .skip((currentPage - 1) * limitPage)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .populate({ path: "user_id" });
  const totalItems = await OrdersModel.find({ status: true }).countDocuments();

  return {
    docs: orders,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.getCart = async (userId, currentPage, limitPage) => {
  const skip = (currentPage - 1) * limitPage;
  const cart = await OrdersModel.find({ user_id: userId, status: false })
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .skip(skip)
    .limit(limitPage)
    .sort({ _id: -1 });

  const totalItems = await OrdersModel.find({
    user_id: userId,
    status: false,
  }).countDocuments();

  return {
    cart: cart,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.getLibrary = async (userId, currentPage, limitPage) => {
  const library = await OrdersModel.find({ user_id: userId, status: true })
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .skip((currentPage - 1) * limitPage)
    .limit(limitPage)
    .sort({ _id: -1 });

  const totalItems = await OrdersModel.find({
    user_id: userId,
    status: true,
  }).countDocuments();

  return {
    library: library,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.addToCart = async (cartData) => {
  const data = new OrdersModel(cartData);
  const newCart = await data.save();
  return await OrdersModel.findOne({
    _id: newCart._id,
  }).populate({
    path: "course_id",
  });
};

module.exports.detailsOrder = async (id) => {
  return await OrdersModel.findById(id)
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .populate({ path: "user_id" });
};

module.exports.updateStatus = async (id) => {
  const order = await OrdersModel.findOne({ _id: id });
  order.status = true;
  return await order.save();
};

module.exports.removeFromCart = async (id) => {
  return await OrdersModel.deleteOne({
    _id: id,
  });
};

module.exports.findOrder = async (orderData) => {
  try {
    return await OrdersModel.findOne(orderData);
  } catch (error) {
    throw error;
  }
};
