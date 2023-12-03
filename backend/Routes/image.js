const express = require('express');
const { createImage } = require('../Controllers/ImageController');
const router = express.Router();

router.post('/', createImage);

module.exports = router;
