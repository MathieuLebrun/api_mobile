// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Conversations', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       User1ID: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       User2ID: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       }
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Conversations');
//   }
// };
