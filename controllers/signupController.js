// controllers/signupController.js
const bcrypt = require('bcrypt');
const User = require('../models/Users');

const signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup };
