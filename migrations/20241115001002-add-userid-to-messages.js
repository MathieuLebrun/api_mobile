'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Messages', 'UserID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.removeColumn('Messages', 'UserID');
  // }
};