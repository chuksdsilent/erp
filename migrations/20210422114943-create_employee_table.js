'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("employee", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING(),
      managerId: Sequelize.STRING(),
      userId: Sequelize.STRING(),
      firstName: Sequelize.STRING(),
      lastName: Sequelize.STRING(),
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE()
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("employee");
  }
};
