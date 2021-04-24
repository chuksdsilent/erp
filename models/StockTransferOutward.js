
const Sequelize = require("Sequelize");


module.exports = sequelize.define("StockTransferOutward", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    recipient: Sequelize.STRING(),
    issuedBy: Sequelize.STRING(),
    purchaseReq: Sequelize.STRING(),
    fromBranch: Sequelize.STRING(),
    expDeliveryDate: Sequelize.STRING(),
    transporterName: Sequelize.STRING(),
    vehicleNo: Sequelize.STRING(),
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

