const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Module_Model = require('./module_model'); // Assurez-vous que le bon modèle est importé

// Message2 Model
const Message2 = sequelize.define('Message2', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_module: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Module_Model', // Assurez-vous que le nom correspond bien à celui du modèle importé
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
Message2.associate = (models) => {
  Message2.belongsTo(models.Module_Model, { foreignKey: 'id_module', as: 'module' });
};

module.exports = Message2;
