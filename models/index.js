const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const User = require('./user');
const Projets = require('./projets');
const Helio = require('./helio');
const Module_Model = require('./module_model');
const Projets_Modules = require('./projets_modules');
const MessageIA = require('./messageIA.js');
const Message = require('./message');
const Conversation = require('./conversation');
const Post = require('./post');
const Commentaire = require('./commentaire');

// Initialize models
const models = {
  User,
  Projets,
  Helio,
  Module_Model,
  Projets_Modules,
  MessageIA,
  Message,
  Conversation,
  Post,
  Commentaire
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
