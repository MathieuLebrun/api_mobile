const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Projets Model
const Projets = sequelize.define('Projets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre_du_projet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objectifs_principaux: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  context: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modules_utilises: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
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
  timestamps: false,
});

// Define associations
Projets.associate = (models) => {
  Projets.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
};

module.exports = Projets;