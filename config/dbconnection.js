const Sequelize = require("sequelize");

const sequelize = new Sequelize("erp", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    operator: false
});

sequelize.authenticate().then(() => { console.log("Database is connected...") }).catch((err) => console.log("Unable to connect ", err))

module.exports = sequelize;

global.sequelize = sequelize;