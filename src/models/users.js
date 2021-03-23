const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      default: null,
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UsersSchema.index({
  "$**": "text",
}); // search
const UsersModel = mongoose.model("users", UsersSchema);
module.exports = UsersModel;
