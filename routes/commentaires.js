// Routes for managing Commentaires
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Commentaire, Post } = require('../models');

// Add a new 
router.post('/commentaires/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const commentaire = await Commentaire.create({
      postId,
      userId: req.user.id,
      content,
    });

    res.status(201).json(commentaire);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all commentaires for a post
router.get('/commentaires/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const commentaires = await Commentaire.findAll({
      where: { postId },
      include: {
        model: Post,
        as: 'post',
        attributes: ['title'],
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(commentaires);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a commentaire
router.put('/commentaires/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const commentaire = await Commentaire.findOne({ where: { id, userId: req.user.id } });
    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire not found' });
    }

    commentaire.content = content;
    await commentaire.save();

    res.json(commentaire);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a commentaire
router.delete('/commentaires/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const commentaire = await Commentaire.findOne({ where: { id, userId: req.user.id } });
    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire not found' });
    }

    await commentaire.destroy();

    res.status(200).json({ message: 'Commentaire deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;