
const Sequelize = require("Sequelize");


module.exports = sequelize.define("PaymentReceipt", {
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
});
