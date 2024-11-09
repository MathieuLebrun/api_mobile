// Commentaire Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commentaire = sequelize.define('Commentaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Posts',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Define associations
Commentaire.associate = (models) => {
  Commentaire.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  Commentaire.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Commentaire;