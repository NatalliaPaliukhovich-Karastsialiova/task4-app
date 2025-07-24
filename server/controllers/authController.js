const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register =  async (req, res) => {
  const { email, password, first_name, last_name, company_name, job_title } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(email, hashed, first_name, last_name, company_name, job_title);
    res.status(201).json({ userId: user.id });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Email already in use' });
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if(user.status === 'blocked') return res.status(400).json({ error: 'User blocked' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    await userModel.updateLastLogin(email);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
};
