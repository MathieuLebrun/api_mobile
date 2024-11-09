'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      User1ID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      User2ID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Vérifier et supprimer la colonne SenderID si elle existe
    const tableDescription = await queryInterface.describeTable('Messages');
    if (tableDescription.SenderID) {
      await queryInterface.removeColumn('Messages', 'SenderID');
    }

    // Vérifier et supprimer la colonne ReceiverID si elle existe
    if (tableDescription.ReceiverID) {
      await queryInterface.removeColumn('Messages', 'ReceiverID');
    }

    // Ajouter la colonne ConversationID
    await queryInterface.addColumn('Messages', 'ConversationID', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id'
      }
    });

    // Ajouter les colonnes createdAt et updatedAt
    await queryInterface.addColumn('Messages', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.addColumn('Messages', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
    // Ajouter les colonnes SenderID et ReceiverID
    await queryInterface.addColumn('Messages', 'SenderID', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Messages', 'ReceiverID', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    // Supprimer les colonnes ConversationID, createdAt et updatedAt
    await queryInterface.removeColumn('Messages', 'ConversationID');
    await queryInterface.removeColumn('Messages', 'createdAt');
    await queryInterface.removeColumn('Messages', 'updatedAt');
  }
};