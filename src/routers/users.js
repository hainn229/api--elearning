const express = require("express");
const router = express.Router();
const { getUsersWithPages, getUsers } = require("../services/users");
const { checkAuth } = require("../middlewares/auth");

router.get("/", async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;
    const keywords = req.query.keywords || "";
    const users = await getUsersWithPages(currentPage, limitPage, keywords);
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
