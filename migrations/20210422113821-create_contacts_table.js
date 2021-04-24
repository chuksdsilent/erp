'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("contacts", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      date: Sequelize.DATE(),
      login: Sequelize.TEXT(),
      salesExec: Sequelize.STRING(),
      lastName: Sequelize.STRING(),
      code: Sequelize.STRING(),
      salutation: Sequelize.STRING(),
      gender: Sequelize.STRING(),
      address: Sequelize.STRING(),
      weddingAnniversary: Sequelize.DATEONLY(),
      birthday: Sequelize.STRING(),
      relativePhoneNo: Sequelize.STRING(),
      company: Sequelize.STRING(),
      email: Sequelize.STRING(),
      phoneNo: Sequelize.STRING(),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("contacts")
  }
};
