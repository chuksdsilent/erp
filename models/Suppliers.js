
const Sequelize = require("sequelize");


module.exports = sequelize.define("Suppliers", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    accName: Sequelize.STRING(),
    code: Sequelize.STRING(),
    accNo: Sequelize.STRING(),
    access: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('access').split(';')
        },
        set(val) {
            this.setDataValue('access', val.join(';'));
        },
    },
    address: Sequelize.STRING(),
    bank: Sequelize.STRING(),
    creditDetails: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('creditDetails').split(';')
        },
        set(val) {
            this.setDataValue('creditDetails', val.join(';'));
        },
    },
    currency: Sequelize.STRING(),
    defaultExec: Sequelize.STRING(),
    email: Sequelize.STRING(),
    supplierName: Sequelize.STRING(),
    mobileNo: Sequelize.STRING(),
    name: Sequelize.STRING(),
    state: Sequelize.STRING(),
    supplierId: Sequelize.STRING(),
    supplierItems: Sequelize.STRING(),
    swiftCode: Sequelize.STRING(),
    tax: Sequelize.STRING(),
    state: Sequelize.STRING(),
    term: Sequelize.STRING(),
    website: Sequelize.STRING(),
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