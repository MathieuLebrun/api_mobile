'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create 'Projets' table with appropriate fields as per the class diagram
    await queryInterface.createTable('Projets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre_du_projet: { // Project title
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      objectifs_principaux: { // Main objectives of the project
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      context: { // Context of the project
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      modules_utilises: { // Modules used in the project
        allowNull: false, // This field cannot be null
        type: Sequelize.STRING
      },
      id_user: { // Foreign key linking to the user who created the project
        allowNull: false, // This field cannot be null
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // References the 'Users' table
          key: 'id' // References the 'id' field in the 'Users' table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // If the user is deleted, delete the related projects
      },
      createdAt: { // Date of project creation
        allowNull: false, // This field cannot be null
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Default value is the current timestamp
      },
      updatedAt: { // Date of last modification
        allowNull: false, // This field cannot be null
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Default value is the current timestamp
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop 'Projets' table
    await queryInterface.dropTable('Projets');
  }
};