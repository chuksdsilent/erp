const Sequelize = require("sequelize");

const sequelize = new Sequelize("erp", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    operator: false
});

if (sequelize) console.log("Database Connected...");

sequelize.sync({
    logging: console.log,
    force: true
})
module.exports = sequelize;

global.sequelize = sequelize;