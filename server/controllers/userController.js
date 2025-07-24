const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.checkUserStatus =  async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userModel.findUserByEmail(email);
    if(user?.status === 'active') next();
    else return res.status(401).json({ error: 'Access denied.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUsers =  async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.handleBatchAction = async (req, res) => {
  const { emails, action } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'No user emails provided' });
  }

  try {
    switch (action) {
      case 'block':
        await userModel.blockUsers(emails);
        break;
      case 'unblock':
        await userModel.unblockUsers(emails);
        break;
      case 'delete':
        await userModel.deleteUsers(emails);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
