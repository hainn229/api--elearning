const express = require('express');
const router = express.Router();
const joi = require('joi');
const {
    getComments,
    addComment,
    updateComment,
    deleteComment,
} = require('../services/comments');

router.get('/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const currentPage = parseInt(req.query.currentPage) || 1;
        const limitPage = parseInt(req.query.limitPage) || 5;

        const comments = await getComments(courseId, currentPage, limitPage);
        return res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
});

router.post('/add', async (req, res) => {
    try {
        const commentData = joi.object({
            course_id: joi.string().required(),
            user_id: joi.string().required(),
            point: joi.number(),
            description: joi.string().required()
        });

        const newComment = await commentData.validate(req.body);
        if (newComment.err) {
            return res.status(400).json({
                message: newComment.err.message
            });
        };

        const comment = await addComment(newComment.value);
        return res.status(200).json({
            comment: comment
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const commentData = joi.object({
            course_id: joi.string().required(),
            user_id: joi.string().required(),
            point: joi.number(),
            description: joi.string().required()
        });

        const updateData = await commentData.validate(req.body);
        if (updateData.err) {
            return res.status(400).json({
                message: updateData.err.message
            });
        };

        await updateComment(req.params.id, updateData.value);
        return res.status(200).json({
            message: 'The comment have been updated successfully!'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteComment(req.params.id);
        return res.status(200).json({
            message: 'Delete comment successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

module.exports = router;