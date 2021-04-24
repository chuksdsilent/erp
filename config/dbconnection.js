const Sequelize = require("Sequelize");

const sequelize = new Sequelize("erp", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    operator: false
});

if (sequelize) console.log("Database Connected...");
module.exports = sequelize;

global.sequelize = sequelize;