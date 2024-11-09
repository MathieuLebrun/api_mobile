const express = require('express');
const router = express.Router();
const { Message } = require('../models'); // Sequelize Message model
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// Send a private message
router.post('/messages', auth, async (req, res) => {
  const { receiverId, content } = req.body;
  
  try {
    const message = await Message.create({
      SenderID: req.user.id,
      ReceiverID: receiverId,
      Content: content
    });

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all messages from a conversation (ordered by timestamp)
router.get('/messages/conversation/:receiverId', auth, async (req, res) => {
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { SenderID: req.user.id, ReceiverID: req.params.receiverId },
            { SenderID: req.params.receiverId, ReceiverID: req.user.id }
          ]
        },
        order: [['createdAt', 'ASC']]
      });
  
      res.json(messages);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Get all messages for the logged-in user (inbox)
router.get('/messages/inbox', auth, async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { ReceiverID: req.user.id }
    });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a message by ID
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const message = await Message.findOne({ where: { id: req.params.id, ReceiverID: req.user.id } });

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
