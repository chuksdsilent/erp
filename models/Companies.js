const Sequelize = require("Sequelize");



module.exports = sequelize.define("Companies", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    email: Sequelize.TEXT(),
    manager: Sequelize.TEXT(),
    address: Sequelize.STRING(),
    brandLogo: Sequelize.STRING(),
    code: {
        type: Sequelize.STRING(),
        unique: true
    },
    executive: Sequelize.STRING(),
    currency: Sequelize.STRING(),
    mobileNo: Sequelize.STRING(),
    startYear: Sequelize.DATE(),
    terms: Sequelize.STRING(),
    name: Sequelize.STRING(),
    tax: Sequelize.DOUBLE(),
    tax: Sequelize.STRING(),
    website: Sequelize.STRING(),
    codeConfig: {
        type: Sequelize.STRING,
        allowNull: false,
        get: function () {
            return JSON.parse(this.getDataValue('codeConfig'));
        },
        set: function (val) {
            return this.setDataValue('codeConfig', JSON.stringify(val));
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

});
