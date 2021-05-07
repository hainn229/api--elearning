const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth, checkRole } = require("../middlewares/auth");
const {
  getOrders,
  getCart,
  addToCart,
  removeFromCart,
  updateStatus,
  getLibrary,
  findOrder,
  getOrdersSuccess,
  detailsOrder
} = require("../services/orders");

router.get("/", checkAuth(true), checkRole(true), async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const orders = await getOrders(currentPage, limitPage, keywords);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/success", checkAuth(true), async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const orders = await getOrdersSuccess(currentPage, limitPage, keywords);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/details/:id", checkAuth(true), async (req, res) => {
  try {
    const order = await detailsOrder(req.params.id);
    return res.status(200).json({
      order: order,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
})

router.get("/:userId", checkAuth(true), async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const cart = await getCart(userId, currentPage, limitPage);
    return res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/library/:userId", checkAuth(true), async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const library = await getLibrary(userId, currentPage, limitPage);
    return res.status(200).json(library);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", checkAuth(true), async (req, res) => {
  try {
    const cartData = joi.object({
      course_id: joi.string().required(),
      user_id: joi.string().required(),
    });

    const newCart = await cartData.validate(req.body);
    if (newCart.err) {
      return res.status(400).json({
        message: newCart.err.message,
      });
    }

    const order = await findOrder({
      user_id: req.body.user_id,
      course_id: req.body.course_id,
    });
    if (order) {
      if (order.status === true) {
        return res
          .status(500)
          .json({ message: "You already own this course !" });
      }
      return res
        .status(500)
        .json({ message: "This course is already in cart !" });
    } else {
      const cart = await addToCart(newCart.value);
      return res.status(200).json({
        cart: cart,
        message: "Add to cart successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    return await updateStatus(req.params.id);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", checkAuth(true), async (req, res) => {
  try {
    await removeFromCart(req.params.id);
    return res.status(200).json({ message: "Remove successfully" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
