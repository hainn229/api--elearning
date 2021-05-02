const express = require("express");
const router = express.Router();

const auth = require("./auth");
const users = require("./users");
const upload = require("./uploadFile");
const categories = require("./categories");
const courses = require("./courses");
const contents = require("./contents");
const comments = require("./comments");
const wishlists = require("./wishlists");
const orders = require("./orders");

router.use("/auth", auth);
router.use("/users", users);
router.use("/upload", upload);
router.use("/categories", categories);
router.use("/courses", courses);
router.use("/contents", contents);
router.use("/comments", comments);
router.use("/wishlists", wishlists);
router.use("/orders", orders);

module.exports = router;
