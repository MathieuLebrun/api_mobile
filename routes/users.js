/*const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Sequelize User model
const auth = require('../middleware/auth');

// Create a new user (registration)
router.post('/register', async (req, res) => {
  const { firstname, name, username, age, email, password } = req.body;
  
  try {
    // Create a new user
    const user = await User.create({ firstname, name, username, age, email, password });

    // Return the new user as JSON
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get the authenticated user's name
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user by primary key (id)
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all users' ID and name
router.get('/users', auth, async (req, res) => {
  try {
    // Retrieve all users and only include their ID and name
    const users = await User.findAll({ attributes: ['id', 'name'] });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;*/

const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Sequelize User model
const auth = require('../middleware/auth');

// Create a new user (registration)
router.post('/register', async (req, res) => {
  const { prenom, nom, age, email, type_utilisateur, password } = req.body;
  
  try {
    // Create a new user
    const user = await User.create({ prenom, nom, age, email, type_utilisateur, password });

    // Return the new user as JSON
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get the authenticated user's name
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user by primary key (id)
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ nom: user.nom });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all users' ID and name
router.get('/users', auth, async (req, res) => {
  try {
    // Retrieve all users and only include their ID and name
    const users = await User.findAll({ attributes: ['id', 'nom'] });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
