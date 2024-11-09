'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 'Users' table with appropriate fields as per the updated model
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prenom: { // User's first name
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      nom: { // User's last name
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      age: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: { // User's email
        allowNull: false, // This field cannot be null
        unique: true, // Email must be unique
        type: Sequelize.STRING
      },
      type_utilisateur: { // Type of user (e.g., admin, regular user)
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      password: { // User's password
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop 'Users' table
    await queryInterface.dropTable('Users');
  }
};