'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("paymentReceipt", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      manager: Sequelize.STRING(),
      access: Sequelize.STRING(),
      branch: Sequelize.STRING(),
      purchaseInvoice: Sequelize.STRING(),
      tax: Sequelize.STRING(),
      supplierName: Sequelize.STRING(),
      billingAddress: Sequelize.STRING(),
      charges: Sequelize.STRING(),
      headerCharges: Sequelize.DATE(),
      purpose: Sequelize.STRING(),
      paymentType: Sequelize.STRING(),
      currency: Sequelize.DOUBLE(),
      paidInto: Sequelize.STRING(),
      amountPaid: Sequelize.DOUBLE(),
      balance: Sequelize.DOUBLE(),
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
      createAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("paymentReceipt");
  }
};
