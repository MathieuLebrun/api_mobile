const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prenom: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  nom: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  type_utilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false
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
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  },
  timestamps: false
});
User.associate = (models) => {
  User.hasMany(models.Post, { foreignKey: 'authorId', as: 'posts' });
};
module.exports = User;