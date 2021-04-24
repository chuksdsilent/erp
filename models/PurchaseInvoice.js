
const Sequelize = require("Sequelize");


module.exports = sequelize.define("PurchaseInvoice", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    batchNo: Sequelize.STRING(),
    requestedQty: Sequelize.STRING(),
    receivedQty: Sequelize.STRING(),
    confirmedBy: Sequelize.STRING(),
    purchaseOrder: Sequelize.STRING(),
    tax: Sequelize.STRING(),
    supplierName: Sequelize.STRING(),
    billingAddress: Sequelize.STRING(),
    paymentDueDate: Sequelize.STRING(),
    charges: Sequelize.STRING(),
    purpose: Sequelize.STRING(),
    name: Sequelize.STRING(),
    paymentType: Sequelize.STRING(),
    currency: Sequelize.STRING(),
    shipmentType: Sequelize.STRING(),
    shipmentTerms: Sequelize.STRING(),
    headerCharges: Sequelize.STRING(),
    website: Sequelize.STRING(),
    toDate: Sequelize.STRING(),
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
