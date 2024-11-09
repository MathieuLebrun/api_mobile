const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Module_Model Model
const Module_Model = sequelize.define('Module_Model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut_du_module_model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  historique: {
    type: DataTypes.STRING,
  },
  id_projet: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Projets',
      key: 'id',
    },
  },
  id_helio: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Helio',
      key: 'id',
    },
  },
  interaction_helio: {
    type: DataTypes.STRING,
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
Module_Model.associate = (models) => {
  Module_Model.belongsTo(models.Projets, { foreignKey: 'id_projet', as: 'projet' }); // Changed alias to 'linked_projet'
  Module_Model.belongsTo(models.Helio, { foreignKey: 'id_helio', as: 'helio' }); // Changed alias to 'related_helio'
};

module.exports = Module_Model;
