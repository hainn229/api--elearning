const mongoose = require("mongoose");

const WishlistsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
    },
  },
  {
    timestamps: true,
  }
);

WishlistsSchema.index({
  "$**": "text",
});
const WishlistsModel = mongoose.model("wishlists", WishlistsSchema);
module.exports = WishlistsModel;
