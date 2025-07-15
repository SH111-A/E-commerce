const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).send('All fields are required');
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send('Username already taken');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
