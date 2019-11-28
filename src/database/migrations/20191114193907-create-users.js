'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        date_nasc: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(120),
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING(150),
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
      return queryInterface.dropTable('users');
  }
};
