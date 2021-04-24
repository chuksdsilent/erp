const Sequelize = require("Sequelize");


module.exports = sequelize.define("LeadContacts", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    date: Sequelize.DATE(),
    login: Sequelize.STRING(),
    salesExec: Sequelize.STRING(),
    lastName: Sequelize.STRING(),
    firstName: Sequelize.STRING(),
    code: Sequelize.STRING(),
    salutation: Sequelize.STRING(),
    gender: Sequelize.STRING(),
    address: Sequelize.TEXT(),
    weddingAnniversary: Sequelize.STRING(),
    birthday: Sequelize.STRING(),
    relativePhoneNo: Sequelize.STRING(),
    company: Sequelize.STRING(),
    email: Sequelize.STRING(),
    phoneNo: Sequelize.STRING(),
});

