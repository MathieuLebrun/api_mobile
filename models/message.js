const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Conversation = require('./conversation');

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

module.exports = Message;
