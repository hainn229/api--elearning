const CoursesModel = require("../models/courses");
const RecentsModel = require("../models/recents");

module.exports.getCoursesWithPages = async (
  currentPage,
  limitPage,
  keywords,
  tutor,
  category,
  level,
  status
) => {
  const skip = (currentPage - 1) * limitPage;
  const query = CoursesModel.find({
    $and: [
      {
        course_title: {
          $regex: keywords,
          $options: "exp",
        },
      },
    ],
  });

  if (tutor.length > 0) {
    query.find({
      tutor_id: {
        $in: tutor,
      },
    });
  }
  if (category.length > 0) {
    query.find({
      cat_id: {
        $in: category,
      },
    });
  }
  if (level.length > 0) {
    query.find({
      level: level,
    });
  }

  if (status.length > 0) {
    query.find({
      status: status,
    });
  }

  const docs = await query
    .skip(skip)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "tutor_id",
      select: "full_name",
    })
    .populate({
      path: "cat_id",
      select: "cat_name",
    })
    .populate({
      path: "contents",
    });

  const courses = await query.countDocuments();

  return {
    docs: docs,
    currentPage: currentPage,
    totalItems: courses,
    limitPage: limitPage,
    level: level,
    status: status,
    tutor: tutor,
    category: category,
  };
};

module.exports.getCoursesPending = async (
  currentPage,
  limitPage,
  keywords,
  tutor,
  category,
  level,
  status
) => {
  const skip = (currentPage - 1) * limitPage;
  const query1 = CoursesModel.find({ status: false });
  const query = query1.find({
    $and: [
      {
        course_title: {
          $regex: keywords,
          $options: "exp",
        },
      },
    ],
  });

  if (tutor.length > 0) {
    query.find({
      tutor_id: {
        $in: tutor,
      },
    });
  }
  if (category.length > 0) {
    query.find({
      cat_id: {
        $in: category,
      },
    });
  }
  if (level.length > 0) {
    query.find({
      level: level,
    });
  }

  const docs = await query
    .skip(skip)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "tutor_id",
      select: "full_name",
    })
    .populate({
      path: "cat_id",
      select: "cat_name",
    })
    .populate({
      path: "contents",
    });

  const courses = await query.countDocuments();

  return {
    docs: docs,
    currentPage: currentPage,
    totalItems: courses,
    limitPage: limitPage,
    level: level,
  };
};

module.exports.getCoursesActive = async (
  currentPage,
  limitPage,
  keywords,
  tutor,
  category,
  level,
  sort,
  status
) => {
  const skip = (currentPage - 1) * limitPage;
  const query1 = CoursesModel.find({ status: true });
  const query = query1.find({
    $and: [
      {
        course_title: {
          $regex: keywords,
          $options: "exp",
        },
      },
    ],
  });

  if (tutor.length > 0) {
    query.find({
      tutor_id: {
        $in: tutor,
      },
    });
  }
  if (category.length > 0) {
    query.find({
      cat_id: {
        $in: category,
      },
    });
  }
  if (level.length > 0) {
    query.find({
      level: level,
    });
  }

  const docs = await query
    .skip(skip)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "tutor_id",
      select: "full_name",
    })
    .populate({
      path: "cat_id",
      select: "cat_name",
    })
    .populate({
      path: "contents",
    });

  const courses = await query.countDocuments();

  return {
    docs: docs,
    currentPage: currentPage,
    totalItems: courses,
    limitPage: limitPage,
    level: level,
    status: status,
  };
};

module.exports.getCoursesAdmin = async (
  currentPage,
  limitPage,
  keywords,
  tutor,
  category,
  level,
  sort
) => {
  const skip = (currentPage - 1) * limitPage;
  const query1 = CoursesModel.find({ tutor_id: null });
  const query = query1.find({
    $and: [
      {
        course_title: {
          $regex: keywords,
          $options: "exp",
        },
      },
    ],
  });

  if (tutor.length > 0) {
    query.find({
      tutor_id: {
        $in: tutor,
      },
    });
  }
  if (category.length > 0) {
    query.find({
      cat_id: {
        $in: category,
      },
    });
  }
  if (level.length > 0) {
    query.find({
      level: level,
    });
  }

  const docs = await query
    .skip(skip)
    .limit(limitPage)
    .sort({
      _id: -1,
    })
    .populate({
      path: "tutor_id",
      select: "full_name",
    })
    .populate({
      path: "cat_id",
      select: "cat_name",
    })
    .populate({
      path: "contents",
    });

  const courses = await query.countDocuments();

  return {
    docs: docs,
    currentPage: currentPage,
    totalItems: courses,
    limitPage: limitPage,
    level: level,
  };
};

module.exports.getCourses = async () => {
  const courses = await CoursesModel.find();
  return courses;
};

module.exports.getPopularCourses = async (currentPage, limitPage) => {
  const skip = (currentPage - 1) * limitPage;
  const query = CoursesModel.find();

  const docs = await query
    .skip(skip)
    .limit(limitPage)
    .sort({
      num_of_subscribers: -1,
    })
    .populate({
      path: "tutor_id",
      select: "full_name",
    })
    .populate({
      path: "cat_id",
      select: "cat_name",
    })
    .populate({
      path: "contents",
    });

  const courses = await query.countDocuments();

  return {
    docs: docs,
    currentPage: currentPage,
    totalItems: courses,
    limitPage: limitPage,
  };
};

module.exports.getRecentCourses = async (userId) => {
  const recents = await RecentsModel.find({ user_id: userId })
    .populate({
      path: "course_id",
      populate: {
        path: "tutor_id",
        select: "full_name",
      },
    })
    .populate({
      path: "course_id",
      populate: {
        path: "cat_id",
        select: "cat_name",
      },
    })
    .sort({
      _id: -1,
    });

  return {
    recents: recents,
  };
};

module.exports.addRecentCourse = async (courseData) => {
  try {
    const newRecent = new RecentsModel(courseData);
    return newRecent.save();
  } catch (err) {
    throw err;
  }
};

module.exports.addCourse = async (courseData) => {
  try {
    const newCourse = new CoursesModel(courseData);
    return newCourse.save();
  } catch (err) {
    throw err;
  }
};

module.exports.detailsCourse = (id) => {
  try {
    return CoursesModel.findById(id)
      .populate({
        path: "tutor_id",
        select: "full_name",
      })
      .populate({
        path: "cat_id",
        select: "cat_name",
      });
  } catch (err) {
    throw err;
  }
};

module.exports.updateCourse = async (id, dataUpdate) => {
  try {
    return await CoursesModel.updateOne(
      {
        _id: id,
      },
      dataUpdate
    );
  } catch (err) {
    throw err;
  }
};

module.exports.deleteCourse = (id) => {
  try {
    return CoursesModel.deleteOne({
      _id: id,
    });
  } catch (err) {
    throw err;
  }
};

module.exports.findCourseByTitle = (courseTitle) => {
  try {
    return CoursesModel.findOne({
      course_title: courseTitle,
    });
  } catch (err) {
    throw err;
  }
};
