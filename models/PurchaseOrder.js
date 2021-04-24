
const Sequelize = require("sequelize");


module.exports = sequelize.define("PurchaseOrder", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    charges: Sequelize.STRING(),
    code: Sequelize.STRING(),
    purchaseManager: Sequelize.STRING(),
    purpose: Sequelize.STRING(),
    requiredDate: Sequelize.STRING(),
    requisitionOrder: Sequelize.STRING(),
    shipmentTerms: Sequelize.STRING(),
    shipmentType: Sequelize.STRING(),
    supplierAddress: Sequelize.STRING(),
    supplierName: Sequelize.STRING(),
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

