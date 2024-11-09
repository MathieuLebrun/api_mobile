const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');
const User = require('../models/user'); // Assurez-vous que le modèle User est correctement défini et importé
const auth = require('../middleware/auth');

// GET toutes les conversations
router.get('/conversation', auth, async (req, res) => {
    const userId = req.user.id; // ID de l'utilisateur authentifié
    try {
      const conversations = await Conversation.findAll({
        where: {
          [Op.or]: [
            { User1ID: userId },
            { User2ID: userId }
          ]
        },
        include: [
          {
            model: User,
            as: 'user1',
            attributes: ['id', 'prenom', 'nom']
          },
          {
            model: User,
            as: 'user2',
            attributes: ['id', 'prenom', 'nom']
          }
        ]
      });
      res.json(conversations);
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: 'Une erreur s’est produite. Veuillez réessayer plus tard.' });
    }
  });

// POST créer une nouvelle conversation
router.post('/conversation', auth, async (req, res) => {
    const User1ID = req.user.id; // ID de l'utilisateur qui crée la conversation
    const { User2ID } = req.body;
    if (!User2ID) {
      return res.status(400).json({ error: 'User2ID is required' });
    }
    try {
      const conversation = await Conversation.create({ User1ID, User2ID });
      res.json(conversation);
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: 'Une erreur s’est produite. Veuillez réessayer plus tard.' });
    }
  });

module.exports = router;