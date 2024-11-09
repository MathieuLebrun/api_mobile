const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); // Assurez-vous que le chemin est correct

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  User1ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  User2ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'Conversations',
  timestamps: true
});

// Définir les relations
Conversation.belongsTo(User, { as: 'user1', foreignKey: 'User1ID' });
Conversation.belongsTo(User, { as: 'user2', foreignKey: 'User2ID' });

module.exports = Conversation;