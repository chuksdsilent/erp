
const Sequelize = require("sequelize");


module.exports = sequelize.define("StockTransferInward", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    outwardBy: Sequelize.STRING(),
    purchaseReq: Sequelize.STRING(),
    fromBranch: Sequelize.STRING(),
    expDeliveryDate: Sequelize.STRING(),
    transporterName: Sequelize.STRING(),
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
});

