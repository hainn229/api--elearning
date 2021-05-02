const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema(
  {
    course_title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: [
        "All levels",
        "Beginning level",
        "Intermediate level",
        "Advanced level",
      ],
      default: "All levels",
    },
    tutor_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    tutor: {
      type: String,
      default: null,
    },
    cat_id: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    description: {
      type: String,
    },
    num_of_subscribers: {
      type: Number,
      default: 0,
    },
    poster: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.P7CgVRpsPkwUfL9XKKk5zAHaIY?w=138&h=171&c=7&o=5&pid=1.7",
    },
  },
  {
    timestamps: true,
  }
);
CoursesSchema.index({
  "$**": "text",
});
const CoursesModel = mongoose.model("courses", CoursesSchema);
module.exports = CoursesModel;
