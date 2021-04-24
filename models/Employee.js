const Sequelize = require("Sequelize");

module.exports = sequelize.define("Employee", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: Sequelize.STRING(),
    managerId: Sequelize.STRING(),
    userId: Sequelize.STRING(),
    firstName: Sequelize.STRING(),
    lastName: Sequelize.STRING(),
    role: Sequelize.STRING(),
    createAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});