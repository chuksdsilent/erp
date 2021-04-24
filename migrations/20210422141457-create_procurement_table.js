'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Procurement", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      accName: Sequelize.STRING(),
      accNo: Sequelize.STRING(),
      address: Sequelize.STRING(),
      bank: Sequelize.STRING(),
      code: Sequelize.STRING(),
      email: Sequelize.STRING(),
      fromDate: Sequelize.STRING(),
      logisticsProvider: Sequelize.STRING(),
      headerCharges: Sequelize.STRING(),
      mobileNo: Sequelize.STRING(),
      date: Sequelize.STRING(),
      name: Sequelize.STRING(),
      state: Sequelize.STRING(),
      swiftCode: Sequelize.STRING(),
      taxDetails: Sequelize.STRING(),
      taxGroup: Sequelize.STRING(),
      terms: Sequelize.STRING(),
      toDate: Sequelize.DATE(),
      website: Sequelize.STRING(),
      toDate: Sequelize.STRING(),
      toDate: Sequelize.STRING(),
      createAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("procurement");
  }
};
