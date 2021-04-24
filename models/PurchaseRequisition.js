

const Sequelize = require("Sequelize");


module.exports = sequelize.define("PurchaseRequisition", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    confirmedBy: Sequelize.STRING(),
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
});
