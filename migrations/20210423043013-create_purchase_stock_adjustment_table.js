'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("purchaseStockAdjustment", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      department: Sequelize.DATE(),
      employee: Sequelize.STRING(),
      remark: Sequelize.STRING(),
      countInterval: Sequelize.STRING(),
      confirmedBy: Sequelize.STRING(),
      confirmedBy: Sequelize.STRING(),
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
    return queryInterface.dropTable("purchaseStockAdjustment")
  }
};
