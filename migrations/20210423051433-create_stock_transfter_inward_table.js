'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("StockTransferInward", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      outwardBy: Sequelize.STRING(),
      purchaseReq: Sequelize.STRING(),
      fromBranch: Sequelize.STRING(),
      expDeliveryDate: Sequelize.STRING(),
      transporterName: Sequelize.STRING(),
      charges: Sequelize.STRING(),
      vehicleNo: Sequelize.STRING(),
      transferRemark: Sequelize.STRING(),
      transporterName: Sequelize.STRING(),
      transporterName: Sequelize.STRING(),
      transporterName: Sequelize.STRING(),
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
    return queryInterface.dropTable("StockTransferInward");
  }
};
