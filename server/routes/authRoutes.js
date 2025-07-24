const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/web/register', authController.register);
router.post('/web/login', authController.login);

module.exports = router;
