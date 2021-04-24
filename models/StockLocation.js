
const Sequelize = require("Sequelize");


module.exports = sequelize.define("StockLocation", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    location: Sequelize.STRING(),
    description: Sequelize.STRING(),
    code: Sequelize.STRING(),
    stockCount: Sequelize.STRING(),
    confirmedBy: Sequelize.STRING()
});
