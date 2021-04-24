
const Sequelize = require("Sequelize");


module.exports = sequelize.define("StockAdjustment", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    department: Sequelize.STRING(),
    employee: Sequelize.STRING(),
    remark: Sequelize.STRING(),
    countInterval: Sequelize.STRING(),
    confirmedBy: Sequelize.STRING(),
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
