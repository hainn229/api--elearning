const express = require('express');
const router = express.Router();

const auth = require('./auth');
const upload = require('./uploadFile');
const categories = require('./categories');

router.use('/auth', auth);
router.use('/upload', upload);
router.use('/categories', categories);

module.exports = router;