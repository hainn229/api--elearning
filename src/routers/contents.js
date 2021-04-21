const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth } = require("../middlewares/auth");
const {
  getContent,
  addContent,
  detailsContent,
  updateContent,
  deleteContent,
} = require("../services/contents");

router.get("/:courseId", async (req, res) => {
  try {
    const contents = await getContent();
    return res.status(200).json({
      contents: contents,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const dataInput = joi.object({
      title: joi.string().pattern(RegExp("^[A-Za-z0-9]*$")).required(),
      description: joi.number().required(),
      url: joi.string().required(),
      course_id: joi.string().required(),
    });

    const newData = await dataInput.validate(req.body);
    if (newData.err) {
      return res.status(400).json({
        message: "Please enter a valid content title!",
      });
    }

    await addContent(newData.value);
    return res.status(200).json({
      message: "New content have been created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const content = await detailsContent(req.params.id);
    return res.status(200).json({
      content: content,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dataInput = joi.object({
      title: joi.string().pattern(RegExp("^[A-Za-z0-9]*$")).required(),
      description: joi.number().required(),
      url: joi.string().required(),
      course_id: joi.string().required(),
    });

    const updateData = await dataInput.validate(req.body);

    if (updateData.err) {
      return res.status(400).json({
        message: "Please enter a valid content title!",
      });
    }

    await updateContent(req.params.id, updateData.value);
    return res.status(200).json({
      message: "The content have been updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteContent(req.params.id);
    return res.status(200).json({
      message: "Delete content successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
