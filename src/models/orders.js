const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "courses",
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
