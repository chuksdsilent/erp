'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Item", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      code: Sequelize.STRING(),
      alternativeItem: Sequelize.STRING(),
      convertionRatio: Sequelize.STRING(),
      dSaleUOM: Sequelize.STRING(),
      description: Sequelize.STRING(),
      expirationDate: Sequelize.STRING(),
      group: Sequelize.INTEGER(),
      maxRate: Sequelize.STRING(),
      minRate: Sequelize.STRING(),
      model: Sequelize.STRING(),
      purchaseRate: Sequelize.STRING(),
      saleRate: Sequelize.STRING(),
      saleByDate: Sequelize.STRING(),
      saleByDate: Sequelize.STRING(),
      standerdCost: Sequelize.STRING(),
      stockDate: Sequelize.DATE(),
      type: Sequelize.STRING(),
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("item")
  }
};
