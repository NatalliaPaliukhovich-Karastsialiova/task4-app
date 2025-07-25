const express = require('express');
const {checkUserStatus, getUsers, handleBatchAction} = require('../controllers/userController');
const {verifyToken} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, checkUserStatus, getUsers);
router.post('/batch', verifyToken, checkUserStatus, handleBatchAction);

module.exports = router;
