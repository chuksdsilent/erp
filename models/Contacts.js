const Sequelize = require("Sequelize");



module.exports = sequelize.define("Contacts", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    date: Sequelize.DATE(),
    login: Sequelize.TEXT(),
    salesExec: Sequelize.STRING(),
    lastName: Sequelize.STRING(),
    code: Sequelize.STRING(),
    salutation: Sequelize.STRING(),
    gender: Sequelize.STRING(),
    address: Sequelize.STRING(),
    weddingAnniversary: Sequelize.STRING(),
    birthday: Sequelize.STRING(),
    relativePhoneNo: Sequelize.DOUBLE(),
    company: Sequelize.STRING(),
    email: Sequelize.STRING(),
    phoneNo: Sequelize.STRING(),
    createAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});
