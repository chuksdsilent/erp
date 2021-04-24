
const Sequelize = require("sequelize");


module.exports = sequelize.define("PurchaseReturn", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    totalAmount: Sequelize.DOUBLE(),
    supplierInvoice: Sequelize.STRING(),
    purchaseInvoice: Sequelize.STRING(),
    supplierInvoiceNo: Sequelize.STRING(),
    supplyDate: Sequelize.STRING(),
    purchaseManager: Sequelize.STRING(),
    supplierName: Sequelize.STRING(),
    charges: Sequelize.STRING(),
    headerCharges: Sequelize.STRING(),
    purpose: Sequelize.STRING(),
    paymentType: Sequelize.STRING(),
    tax: Sequelize.STRING(),
    accountDetails: Sequelize.STRING(),
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
});
