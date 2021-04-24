
const Sequelize = require("Sequelize");


module.exports = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: Sequelize.STRING(),
    username: Sequelize.STRING(),
    password: Sequelize.STRING(),
    role: Sequelize.STRING()
});