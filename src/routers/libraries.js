const express = require('express');
const router = express.Router();
const joi = require('joi');
const { checkAuth } = require("../middlewares/auth");
const {
    getLibrary,
    addToLibrary,
    removeFromLibrary
} = require('../services/libraries');

router.get('/:userId', checkAuth(true), async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentPage = parseInt(req.query.currentPage) || 1;
        const limitPage = parseInt(req.query.limitPage) || 5;

        const library = await getLibrary(userId, currentPage, limitPage);
        return res.status(200).json(library);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
});

router.post('/add', checkAuth(true), async (req, res) => {
    try {
        const libraryData = joi.object({
            course_id: joi.string().required(),
            user_id: joi.string().required()
        });

        const newLibrary = await libraryData.validate(req.body);
        if (newLibrary.err) {
            return res.status(400).json({
                message: newLibrary.err.message
            });
        };

        const library = await addToLibrary(newLibrary.value);
        return res.status(200).json({
            library: library
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
});

router.delete('/:id', checkAuth(true), async (req, res) => {
    try {
        await removeFromLibrary(req.params.id);
        return res.status(200).json({
            message: 'Archie course from library successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

module.exports = router;