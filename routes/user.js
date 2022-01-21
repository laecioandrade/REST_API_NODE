const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controllers');

router.post('/', UserController.registrationUser);
router.post('/login', UserController.loginUser);


module.exports = router;