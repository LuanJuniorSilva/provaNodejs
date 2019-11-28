'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('books_favorites', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          allowNull: false,
        },
        isbn_id: {
          type: Sequelize.STRING,
          references: { model: 'books', key: 'isbn' },
          onUpdate: 'CASCADE',
          allowNull: false,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
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
      return queryInterface.dropTable('books_favorites');
  }
};
