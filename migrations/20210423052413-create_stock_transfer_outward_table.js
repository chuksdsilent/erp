'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("stock_transfer_outward", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      recipient: Sequelize.STRING(),
      issuedBy: Sequelize.STRING(),
      purchaseReq: Sequelize.STRING(),
      fromBranch: Sequelize.STRING(),
      expDeliveryDate: Sequelize.STRING(),
      transporterName: Sequelize.STRING(),
      vehicleNo: Sequelize.STRING(),
      charges: Sequelize.STRING(),
      vehicleNo: Sequelize.STRING(),
      transferRemark: Sequelize.STRING(),
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
    return queryInterface.dropTable("stockTansferOutward")
  }
};
