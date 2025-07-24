const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, userController.checkUserStatus, userController.getUsers);
router.post('/batch', verifyToken, userController.checkUserStatus, userController.handleBatchAction);

module.exports = router;
