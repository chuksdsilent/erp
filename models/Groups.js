const Sequelize = require("Sequelize");

module.exports = sequelize.define("Groups", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code: Sequelize.STRING(),
    accountDetails: Sequelize.STRING(),
    accountName: Sequelize.STRING(),
    description: Sequelize.STRING(),
    lastName: Sequelize.STRING(),
    firstName: Sequelize.STRING(),
    frOmDate: Sequelize.STRING(),
    toDate: Sequelize.STRING(),
    name: Sequelize.STRING(),
    taxGroup: Sequelize.STRING()
});
