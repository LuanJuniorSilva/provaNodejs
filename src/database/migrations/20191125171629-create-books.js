'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('books', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        isbn: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        title: {
          type: Sequelize.STRING(120),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(80),
          allowNull: false,
        },
        year: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('books');
  }
};
