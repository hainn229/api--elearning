const express = require('express');
const router = express.Router();
const {
    login,
    register,
    findUserByEmail
} = require('../services/users');
const joi = require('joi');
const {
    checkAuth
} = require('../middlewares/auth');

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
            displayName: joi.string().required(),
            password: joi.string().required(),
            gender: joi.string().required(),
            date_of_birth: joi.date().required(),
            role: joi.string().required(),
            avatarUrl: joi.string()
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

module.exports = router;