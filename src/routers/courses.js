const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth, checkRole } = require("../middlewares/auth");
const {
  getCoursesWithPages,
  getCourses,
  getCoursesActive,
  getCoursesPending,
  getPopularCourses,
  addCourse,
  detailsCourse,
  updateCourse,
  deleteCourse,
  findCourseByTitle,
  getRecentCourses,
  addRecentCourse,
  getCoursesAdmin,
} = require("../services/courses");

router.get("/", async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 10;

    const keywords = req.query.keywords || "";

    const tutor = req.query.tutor || "";
    const category = req.query.category || "";
    const level = req.query.level || "";
    const status = req.query.status || {};

    const sortField = req.query.sortField || "_id";
    const sortType = req.query.sortType || -1;
    const sort = { sortField, sortType };

    const courses = await getCoursesWithPages(
      currentPage,
      limitPage,
      keywords,
      tutor,
      category,
      level,
      status,
      sort
    );
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/pending", checkAuth(true), async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 10;

    const keywords = req.query.keywords || "";

    const tutor = req.query.tutor || "";
    const category = req.query.category || "";
    const level = req.query.level || "";

    const sortField = req.query.sortField || "_id";
    const sortType = req.query.sortType || -1;
    const sort = { sortField, sortType };

    const courses = await getCoursesPending(
      currentPage,
      limitPage,
      keywords,
      tutor,
      category,
      level,
      sort
    );
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/active", async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 10;

    const keywords = req.query.keywords || "";

    const tutor = req.query.tutor || "";
    const category = req.query.category || "";
    const level = req.query.level || "";

    const sortField = req.query.sortField || "_id";
    const sortType = req.query.sortType || -1;
    const sort = { sortField, sortType };

    const courses = await getCoursesActive(
      currentPage,
      limitPage,
      keywords,
      tutor,
      category,
      level,
      sort
    );
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/admin", async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 10;

    const keywords = req.query.keywords || "";

    const tutor = req.query.tutor || "";
    const category = req.query.category || "";
    const level = req.query.level || "";

    const sortField = req.query.sortField || "_id";
    const sortType = req.query.sortType || -1;
    const sort = { sortField, sortType };

    const courses = await getCoursesAdmin(
      currentPage,
      limitPage,
      keywords,
      tutor,
      category,
      level,
      sort
    );
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/all", checkAuth(true), async (req, res) => {
  try {
    const keywords = req.query.keywords || "";

    const courses = await getCourses(keywords);
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;
    const courses = await getPopularCourses(currentPage, limitPage);
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/recent/:userId", checkAuth(true), async (req, res) => {
  try {
    const courses = await getRecentCourses(req.params.id);
    return res.status(200).json({
      courses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", checkAuth(true), async (req, res) => {
  try {
    const dataInput = joi.object({
      course_title: joi.string().pattern(RegExp("^[A-Za-z0-9]*$")).required(),
      price: joi.number().required(),
      tutor_id: joi.string(),
      cat_id: joi.string().required(),
      description: joi.string(),
    });

    const newData = await dataInput.validate(req.body);
    if (newData.err) {
      return res.status(400).json({
        message: "Please enter a valid course title!",
      });
    }

    const course = await findCourseByTitle(req.body.course_title);
    if (course) {
      return res.status(200).json({
        message: "The course title is already exist!",
      });
    }
    await addCourse(newData.value);
    return res.status(200).json({
      message: "New course have been created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/recent/add", checkAuth(true), async (req, res) => {
  try {
    const recentData = joi.object({
      course_id: joi.string().required(),
      user_id: joi.string().required(),
    });

    const newRecent = await recentData.validate(req.body);
    if (newRecent.err) {
      return res.status(400).json({
        message: newRecent.err.message,
      });
    }

    const recent = await addRecentCourse(newRecent.value);
    return res.status(200).json({
      recent: recent,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await detailsCourse(req.params.id);
    return res.status(200).json({
      course: course,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", checkAuth(true), async (req, res) => {
  try {
    const dataInput = joi.object({
      course_title: joi.string().pattern(RegExp("^[A-Za-z0-9]*$")),
      price: joi.number(),
      tutor_id: joi.string(),
      cat_id: joi.string(),
      description: joi.string(),
      num_of_subscribers: joi.number(),
      tutor: joi.string(),
      poster: joi.string(),
      status: joi.boolean(),
    });

    const updateData = await dataInput.validate(req.body);

    if (updateData.err) {
      return res.status(400).json({
        message: "Please enter a valid course title!",
      });
    }

    const course = await findCourseByTitle(req.body.course_title);
    if (course) {
      return res.status(200).json({
        message: "The course title is already exist!",
      });
    }

    await updateCourse(req.params.id, updateData.value);
    return res.status(200).json({
      message: "The course have been updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", checkAuth(true), async (req, res) => {
  try {
    await deleteCourse(req.params.id);
    return res.status(200).json({
      message: "Delete category successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
