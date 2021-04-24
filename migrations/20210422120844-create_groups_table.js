'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("groups", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      code: Sequelize.STRING(),
      accountDetails: Sequelize.STRING(),
      accountName: Sequelize.STRING(),
      description: Sequelize.STRING(),
      lastName: Sequelize.STRING(),
      firstName: Sequelize.STRING(),
      frOmDate: Sequelize.STRING(),
      toDate: Sequelize.STRING(),
      name: Sequelize.STRING(),
      taxGroup: Sequelize.STRING(),
      createAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("groups");
  }
};
