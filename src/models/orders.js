const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    cart: [
      {
        course_id: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "courses",
        },
        user_id: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "users",
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
OrdersSchema.index({
  "$**": "text",
});
const OrdersModel = mongoose.model("orders", OrdersSchema);
module.exports = OrdersModel;
