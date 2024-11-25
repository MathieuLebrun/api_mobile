const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation');
const { Op } = require('sequelize'); 
const User = require('../models/user'); // Assurez-vous que le modèle User est correctement défini et importé
const Message  = require('../models/message');
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

    // Transformer les résultats pour inclure seulement l'autre utilisateur et l'ID de la conversation
    const transformedConversations = conversations.map(conversation => {
      const otherUser = conversation.User1ID === userId ? conversation.user2 : conversation.user1;
      return {
        conversationId: conversation.id,
        otherUser: {
          id: otherUser.id,
          prenom: otherUser.prenom,
          nom: otherUser.nom
        }
      };
    });

    res.json(transformedConversations);
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

// GET messages d'une conversation spécifique
router.get('/conversation/messages', auth, async (req, res) => {
  const { conversationId } = req.query;
  if (!conversationId) {
    return res.status(400).json({ error: 'conversationId is required' });
  }
  try {
      const messages = await Message.findAll({
          where: { ConversationID: conversationId },
          include: [
            {
              model: User,
              attributes: ['id', 'prenom', 'nom'] // Inclure les informations de l'utilisateur
            }
          ]
      });

      // Formater les messages pour correspondre aux données en dur
      const formattedMessages = messages.map(msg => ({
          userId: msg.UserID,
          userName: `${msg.User.prenom} ${msg.User.nom}`,
          conversationId: msg.ConversationID,
          message: msg.Content
      }));

      res.json(formattedMessages);
  } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ error: 'Une erreur s’est produite. Veuillez réessayer plus tard.' });
  }
});

module.exports = router;