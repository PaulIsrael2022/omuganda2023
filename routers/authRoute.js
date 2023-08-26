const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { login, logout } = require('../controllers/authenticationController');

router.post('/user-register', userController.registerUser);

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
