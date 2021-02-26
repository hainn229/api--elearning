const express = require('express');
const router = express.Router();
const joi = require('joi');
const {
    getCategoriesWithPages,
    getCategories,
    addCategory,
    detailsCategory,
    updateCategory,
    deleteCategory,
    findCategoryByName,
} = require('../services/admin/categories');

router.get('/', async (req, res) => {
    try {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const limitPage = parseInt(req.query.limitPage) || 5;
        const keywords = req.query.keywords || '';
        const categories = await getCategoriesWithPages(currentPage, limitPage, keywords);
        return res.status(200).json({
            categories: categories
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

router.get('/all', async (req, res) => {
    try {
        const categories = await getCategories();
        return res.status(200).json({
            categories: categories
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

router.post('/add', async (req, res) => {
    try {
        const dataInput = joi.object({
            cat_name: joi.string().pattern(RegExp('^[A-Za-z0-9]*$')).required()
        });

        const newData = await dataInput.validate(req.body);
        if (newData.err) {
            return res.status(400).json({
                message: 'Please enter a valid category name!'
            });
        }

        const category = await findCategoryByName(req.body.cat_name);
        if (category) {
            return res.status(200).json({
                message: 'The category name is already exist!'
            });
        }
        await addCategory(newData.value);
        return res.status(200).json({
            message: 'New category have been created successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

router.get('/:catId', async (req, res) => {
    try {
        const category = await detailsCategory(req.params.catId);
        return res.status(200).json({
            category: category
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

router.put('/:catId', async (req, res) => {
    try {
        const dataInput = joi.object({
            cat_name: joi.string().pattern(RegExp('^[A-Za-z0-9]*$')).required()
        });

        const updateData = await dataInput.validate(req.body);

        if (updateData.err) {
            return res.status(400).json({
                message: 'Please enter a valid category name!'
            })
        }

        const category = await findCategoryByName(req.body.cat_name);
        if (category) {
            return res.status(200).json({
                message: 'The category name is already exist!'
            });
        }

        await updateCategory(req.params.catId, updateData.value);
        return res.status(200).json({
            message: 'The category name have been updated successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

router.delete('/:catId', async (req, res) => {
    try {
        await deleteCategory(req.params.catId);
        return res.status(200).json({
            message: 'Delete category successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    };
});

module.exports = router;