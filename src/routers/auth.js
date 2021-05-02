const express = require("express");
const router = express.Router();
const axios = require("axios");
const joi = require("joi");
const { checkAuth, checkRole } = require("../middlewares/auth");
const {
  Token,
  login,
  register,
  findUserByEmail,
  findUserByGoogleId,
  updateUser,
  updatePassword,
  resetPassword,
  getInfo,
  deleteUser,
} = require("../services/users");
const UsersModel = require("../models/users");

router.get("/myAccount", checkAuth(true), (req, res) => {
  res.status(200).json(req.user);
});

router.get(`/:id`, checkAuth(true), async (req, res) => {
  try {
    const info = await getInfo(req.params.id);
    if (info) {
      return res.status(200).json({
        info,
      });
    } else {
      return res.status(400).json({
        message: `Cannot get user information !`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const dataInput = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const userInput = await dataInput.validateAsync(req.body);
    const user = await login(userInput.email, userInput.password);
    if (user) {
      return res.status(200).json({
        user: user.userInfo,
        token: user.token,
      });
    } else {
      return res.status(400).json({
        message: `The email address or password that you've entered is incorrect!`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
    // next(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const dataInput = joi
      .object({
        full_name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        // date_of_birth: joi.date().required(),
        // avatarUrl: joi.string(),
      })
      .unknown();

    const userInput = await dataInput.validateAsync(req.body);
    const user = await findUserByEmail(userInput.email);
    if (user != null) {
      return res.status(400).json({
        message: "The email address is already exist!",
      });
    }
    if (userInput.err) {
      return res.status(400).json({
        message: userInput.err.message,
      });
    }

    await register(userInput);
    return res.status(200).json({
      message: `Register Successfully!`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/google", async (req, res) => {
  try {
    const response = await axios.default.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${req.body.access_token}`
    );
    if (response.data) {
      const user = await findUserByGoogleId(response.data.id);
      if (user != null) {
        const token = Token(user._id, user.email, user.role);
        return res.status(200).json({
          user: user,
          token: token,
        });
      } else {
        const newUser = new UsersModel({
          email: response.data.email,
          full_name: response.data.name,
          avatarUrl: response.data.picture,
          gender: null,
          date_of_birth: null,
          googleId: response.data.id,
          // password...
        });

        const user = await newUser.save();
        const token = Token(user._id, user.email, user.role);
        return res.status(200).json({
          user: user,
          token: token,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dataInput = req.body;
    await updateUser(req.params.id, dataInput);
    return res.status(200).json({
      message: "Update information successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      // message: err.message,
      message: "Update failed ! " + err.message,
    });
  }
});

router.put("/updatePassword", checkAuth(true), async (req, res) => {
  try {
    const bodySchema = joi
      .object({
        cur_password: joi.string().required("Current password is required !"),
        new_password: joi.string().required("New password is required !"),
      })
      .unknown();
    const data = await bodySchema.validateAsync(req.body);
    if (data.err) {
      res.status(400).json({ message: data.err.message });
    }
    const result = await updatePassword(
      req.body._id,
      req.body.cur_password,
      req.body.new_password
    );
    if (result.err) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect !" });
    }
    return res.status(200).json({ message: "Update password successfully !" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", checkAuth(true), checkRole(true), async (req, res) => {
  try {
    await deleteUser(req.params.id);
    return res.status(200).json({
      message: "User have been deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
