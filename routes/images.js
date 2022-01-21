const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const ImagesController = require('../controllers/images-controller');

router.delete('/:imageId', login.obrigatorio, ImagesController.deleteImage);

module.exports = router;