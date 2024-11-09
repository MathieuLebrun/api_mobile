const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance

// Post Model
const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  geolocalisation: {
    type: DataTypes.STRING,
  },
  authorId: {
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
  timestamps: true,
});

// Define associations
Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
  Post.hasMany(models.Commentaire, { foreignKey: 'postId', as: 'comments' });
};

module.exports = Post;