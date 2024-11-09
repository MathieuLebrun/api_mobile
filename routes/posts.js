const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { Post, User, Commentaire } = require('../models'); // Sequelize Post model

// Create a new post
router.post('/post', 
  [
    auth, 
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      // Create a new post with Sequelize
      const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        geolocalisation: JSON.stringify(req.body.geolocalisation),
        image: req.body.image,
        authorId: req.user.id  // assuming 'authorId' is the foreign key for User
      });

      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        geolocalisation: post.geolocalisation,
        image: post.image,
        createdAt: post.createdAt
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route pour obtenir tous les posts avec leurs commentaires
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User, // Inclure les informations de l'auteur
          as: 'author',
          attributes: ['prenom', 'nom']
        },
        {
          model: Commentaire, // Inclure les commentaires
          as: 'comments',
          include: {
            model: User, // Inclure les informations du commentateur
            as: 'user', // Alias mis à jour pour correspondre au modèle
            attributes: ['prenom', 'nom']
          }
        }
      ],
      order: [['createdAt', 'DESC']] // Trier les posts par date de création
    });

    // Remapper les posts pour inclure les informations de l'auteur et des commentaires
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      comments: post.comments.map(comment => ({
        id: comment.id,
        text: comment.content, // Mise à jour pour correspondre au champ "content" du modèle Commentaire
        createdAt: comment.createdAt,
        commenter: comment.user ? comment.user.prenom + ' ' + comment.user.nom : null
      })),
      geolocalisation: post.geolocalisation,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author ? post.author.prenom + ' ' + post.author.nom : null,
      image: post.image
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Delete a post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    // Find the post by ID and author using Sequelize
    const post = await Post.findOne({ where: { id: req.params.id, authorId: req.user.id } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.destroy();

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;