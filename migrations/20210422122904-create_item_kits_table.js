'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("itemKits", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      code: Sequelize.STRING(),
      fixedPrice: Sequelize.STRING(),
      itemDetails: Sequelize.STRING(),
      group: Sequelize.STRING(),
      description: Sequelize.STRING(),
      name: Sequelize.STRING(),
      pricing: Sequelize.INTEGER(),
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
      createdAt: Sequelize.DATE(),
      updatedAt: Sequelize.DATE(),
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("itemKits");
  }
};
