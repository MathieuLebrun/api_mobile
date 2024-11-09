'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // Create 'Hello' table
    await queryInterface.createTable('Hello', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statut_du_module: {
        allowNull: false,
        type: Sequelize.STRING
      },
      historique: {
        type: Sequelize.STRING
      },
      id_projet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Projets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date_creation: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      date_modification: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Create 'Module' table
    await queryInterface.createTable('Module', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statut_du_module: {
        allowNull: false,
        type: Sequelize.STRING
      },
      historique: {
        type: Sequelize.STRING
      },
      id_projet: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_helio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hello',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      interaction_helio: {
        type: Sequelize.STRING
      },
      date_creation: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      date_modification: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Create 'Projets_Modules' table
    await queryInterface.createTable('Projets_Modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_projet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Projets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_module: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Module',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      date_activation: {
        type: Sequelize.DATE
      },
      date_desactivation: {
        type: Sequelize.DATE
      },
      statut: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });

    // Create 'Message' table
    await queryInterface.createTable('Message', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_module: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Module',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      interaction_helio: {
        type: Sequelize.STRING
      },
      date_creation: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      date_modification: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop 'Message' table
    await queryInterface.dropTable('Message');

    // Drop 'Projets_Modules' table
    await queryInterface.dropTable('Projets_Modules');

    // Drop 'Module' table
    await queryInterface.dropTable('Module');

    // Drop 'Hello' table
    await queryInterface.dropTable('Hello');
  }
};