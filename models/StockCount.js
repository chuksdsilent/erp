
const Sequelize = require("sequelize");


module.exports = sequelize.define("StockCount", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    department: Sequelize.STRING(),
    employee: Sequelize.STRING(),
    remark: Sequelize.STRING(),
    stockCount: Sequelize.STRING(),
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
});