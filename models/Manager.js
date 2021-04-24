const sequelize = require("sequelize");

module.exports = sequelize.define("Managers", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: Sequelize.STRING(),
    userId: Sequelize.STRING(),
    accMgrName: Sequelize.STRING(),
    createAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});
