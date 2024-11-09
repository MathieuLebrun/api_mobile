const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { User } = require('../models'); // Sequelize User model
const router = express.Router();

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  if(!email){
    return res.status(400).json({ message: '"email" is required' });
  }
  if(!password){
    return res.status(400).json({ message: '"password" is required' });
  }

  // Find the user by email using Sequelize
  const user = await User.findOne({ where: { email } });

  if(!user){
    return res.status(401).json({ message: 'Username or password is incorrect' });
  }

  // Compare passwords
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Username or password is incorrect' });
  }

  // Generate a JWT token with the user ID as payload
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  // Return the token as JSON
  res.json({ token });
});

module.exports = router;
