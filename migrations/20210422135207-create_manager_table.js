'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("managers", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING(),
      userId: Sequelize.STRING(),
      accMgrName: Sequelize.STRING(),
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
    return queryInterface.drop("managers")
  }
};
