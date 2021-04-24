'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("purchaseRequision", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      confirmedBy: Sequelize.DATE(),
      code: Sequelize.STRING(),
      purchaseManager: Sequelize.STRING(),
      purpose: Sequelize.STRING(),
      requisitionDate: Sequelize.STRING(),
      validTill: Sequelize.STRING(),
      tax: Sequelize.STRING(),
      itemDetails: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('itemDetails').split(';')
        },
        set(val) {
          this.setDataValue('itemDetails', val.join(';'));
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("purchaseTable");
  }

};
