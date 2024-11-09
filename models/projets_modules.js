const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projets_Modules = sequelize.define('Projets_Modules', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_projet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projets',
      key: 'id',
    },
  },
  id_module: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Module_Model',
      key: 'id',
    },
  },
  date_activation: {
    type: DataTypes.DATE,
  },
  date_desactivation: {
    type: DataTypes.DATE,
  },
  statut: {
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
  timestamps: false,
});

// Define associations
Projets_Modules.associate = (models) => {
  Projets_Modules.belongsTo(models.Projets, { foreignKey: 'id_projet', as: 'projet' });
  Projets_Modules.belongsTo(models.Module_Model, { foreignKey: 'id_module', as: 'module' });
};

module.exports = Projets_Modules;
