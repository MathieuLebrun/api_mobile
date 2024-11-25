const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Conversation = require('./conversation');
const User = require('./user');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ConversationID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Conversations',
      key: 'id'
    }
  },
  UserID: { // Ajout de l'ID de l'utilisateur
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
    timestamps: true,
});

// Définir les relations
Conversation.hasMany(Message, { foreignKey: 'ConversationID' });
Message.belongsTo(Conversation, { foreignKey: 'ConversationID' });
User.hasMany(Message, { foreignKey: 'UserID' }); // Définir la relation avec User
Message.belongsTo(User, { foreignKey: 'UserID' });

module.exports = Message;
