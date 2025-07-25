const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/web/register', register);
router.post('/web/login', login);

module.exports = router;
