'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("leadContacts", {
      date: Sequelize.DATE(),
      login: Sequelize.STRING(),
      salesExec: Sequelize.STRING(),
      lastName: Sequelize.STRING(),
      firstName: Sequelize.STRING(),
      code: Sequelize.STRING(),
      salutation: Sequelize.STRING(),
      gender: Sequelize.STRING(),
      address: Sequelize.STRING(),
      weddingAnniversary: Sequelize.STRING(),
      birthday: Sequelize.STRING(),
      relativePhoneNo: Sequelize.INTEGER(),
      company: Sequelize.STRING(),
      email: Sequelize.STRING(),
      phoneNo: Sequelize.STRING(),
      createAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("leadContacts");
  }
};
