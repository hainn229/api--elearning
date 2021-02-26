const express = require('express');
const router = express.Router();
const auth = require('./auth');
const upload = require('./uploadFile');

router.use('/auth', auth);
router.use('/upload', upload);

module.exports = router;