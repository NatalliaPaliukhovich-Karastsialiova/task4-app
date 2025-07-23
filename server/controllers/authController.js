const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register =  async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(email, hashed, first_name, last_name);
    res.status(201).json({ userId: user.id });
  } catch (err) {
    console.log(err)
    if (err.code === '23505') return res.status(400).json({ error: 'Email already in use' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ email: user.email,
              first_name: user.first_name,
              last_name: user.last_name });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
