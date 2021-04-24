'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: Sequelize.STRING(),
      username: Sequelize.STRING(),
      password: Sequelize.STRING(),
      remember_token: Sequelize.STRING(),
      role: Sequelize.STRING(),
      createdAt: {
        type: Sequelize.DATE(),
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE(),
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users")
  }
};
