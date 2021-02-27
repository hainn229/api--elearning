const express = require('express');
const router = express.Router();
const axios = require('axios');
const joi = require('joi');
const {
    Token,
    login,
    register,
    findUserByEmail,
    findUserByGoogleId
} = require('../services/users');
const {
    checkAuth
} = require('../middlewares/auth');
const UsersModel = require('../models/users');

router.get('/myAccount', checkAuth(true), (req, res) => {
    res.status(200).json(req.user);
});

router.post('/login', async (req, res, next) => {
    try {
        const dataInput = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        });

        const userInput = await dataInput.validateAsync(req.body);
        const user = await login(userInput.email, userInput.password);
        if (user) {
            return res.status(200).json({
                user: user.userInfo,
                token: user.token
            });
        }
        return res.status(400).json({
            message: `The email address or password that you've entered is incorrect!`
        });
    } catch (err) {
        next(err);
    };
});

router.post('/register', async (req, res) => {
    try {
        const dataInput = joi.object({
            email: joi.string().email().required(),
            full_name: joi.string().required(),
            password: joi.string().required(),
            gender: joi.string().required(),
            date_of_birth: joi.date().required(),
            avatarUrl: joi.string(),
        }).unknown();

        const userInput = await dataInput.validateAsync(req.body);
        const user = await findUserByEmail(userInput.email);
        if (user != null) {
            return res.status(400).json({
                message: "The email address is already exist!"
            });
        };
        if (userInput.err) {
            return res.status(400).json({
                message: userInput.err.message
            });
        };

        await register(userInput);
        return res.status(200).json({
            message: `Register Successfully!`
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.post('/google', async (req, res) => {
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
                    token: token
                });
            } else {
                const newUser = new UsersModel({
                    email: response.data.email,
                    full_name: response.data.name,
                    avatarUrl: response.data.picture,
                    gender: null,
                    date_of_birth: null,
                    googleId: response.data.id
                    // password...
                });

                const user = await newUser.save();
                const token = Token(
                    user._id,
                    user.email,
                    user.role
                );
                return res.status(200).json({
                    user: user,
                    token: token
                });
            };
        };
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

module.exports = router;