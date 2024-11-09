const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Helio Model
const Helio = sequelize.define('Helio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut_du_module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  historique: {
    type: DataTypes.STRING,
  },
  id_projet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projets',
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
Helio.associate = (models) => {
    Helio.belongsTo(models.Projets, { foreignKey: 'id_projet', as: 'projet' });
};

module.exports = Helio;