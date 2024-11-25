const express = require('express');
const router = express.Router();
const { Message, User } = require('../models'); // Sequelize Message model
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// Send a private message
router.post('/messages', auth, async (req, res) => {
  const { conversationId, content } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const message = await Message.create({
      Content: content,
      ConversationID: conversationId, // Assuming you have a conversationId in the body
      UserID: req.user.id
    });

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a message by ID
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const message = await Message.findOne({ where: { id: req.params.id, UserID: req.user.id } });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.destroy();
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;