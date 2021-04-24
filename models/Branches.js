const Sequelize = require("Sequelize");



module.exports = sequelize.define("branches", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    address: Sequelize.TEXT(),
    company: Sequelize.STRING(),
    currency: Sequelize.STRING(),
    email: {
        type: Sequelize.STRING
    },
    executive: Sequelize.STRING(),
    mobileNo: Sequelize.STRING(),
    startYear: Sequelize.DATE(),
    terms: Sequelize.STRING(),
    name: Sequelize.STRING(),
    tax: Sequelize.STRING(),
    website: Sequelize.STRING(),
    code: {
        type: Sequelize.STRING,
        unique: true
    },
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
    manager: Sequelize.STRING()
});
