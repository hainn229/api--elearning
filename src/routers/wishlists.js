const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth } = require("../middlewares/auth");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  findWishlist,
} = require("../services/wishlists");
const { findOrder } = require("../services/orders");

router.get("/:userId", checkAuth(true), async (req, res) => {
  try {
    const userId = req.params.userId;

    const wishlists = await getWishlist(userId);
    return res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", checkAuth(true), async (req, res) => {
  try {
    const wishlistData = joi.object({
      user_id: joi.string().required(),
      course_id: joi.string().required(),
    });

    const newWishlist = await wishlistData.validate(req.body);
    if (newWishlist.err) {
      return res.status(400).json({
        message: newWishlist.err.message,
      });
    }
    const order = await findOrder({
      user_id: req.body.user_id,
      course_id: req.body.course_id,
    });
    if (order) {
      order.status === false
        ? res.status(500).json({
            message: "This course is already in cart !",
          })
        : res.status(500).json({
            message: "You already own this course !",
          });
    } else {
      const check = await findWishlist({
        user_id: req.body.user_id,
        course_id: req.body.course_id,
      });
      if (check) {
        return await removeFromWishlist(req.params.id);
      } else {
        const wishlist = await addToWishlist(newWishlist.value);
        return res.status(200).json({
          wishlist: wishlist,
          message: "Add to wishlist successfully !",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", checkAuth(true), async (req, res) => {
  try {
    await removeFromWishlist(req.params.id);
    return res.status(200).json({
      message: "Remove course from wishlist successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
