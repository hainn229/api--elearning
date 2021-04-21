const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth } = require("../middlewares/auth");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  findCourseInWishlist,
} = require("../services/wishlists");

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const wishlists = await getWishlist(userId, currentPage, limitPage);
    return res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const wishlistData = joi.object({
      course_id: joi.string().required(),
      user_id: joi.string().required(),
    });

    const newWishlist = await wishlistData.validate(req.body);
    if (newWishlist.err) {
      return res.status(400).json({
        message: newWishlist.err.message,
      });
    }
    const check = await findCourseInWishlist(
      req.body.user_id,
      req.body.course_id._id
    );
    if (check) {
      return await removeFromWishlist(req.body.user_id, req.body.course_id._id);
    } else {
      const wishlist = await addToWishlist(newWishlist.value);
      return res.status(200).json({
        wishlist: wishlist,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
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
