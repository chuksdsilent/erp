'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING(200)

      },

      address: Sequelize.TEXT(),
      company: Sequelize.STRING(),
      currency: Sequelize.STRING(),
      email: Sequelize.STRING(),
      executive: Sequelize.STRING(),
      mobileNo: Sequelize.STRING(),
      startYear: Sequelize.DATE(),
      terms: Sequelize.STRING(),
      name: Sequelize.STRING(),
      tax: Sequelize.STRING(),
      website: Sequelize.STRING(),
      code: Sequelize.STRING(),
      codeConfig: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue('codeConfig').split(';')
        },
        set(val) {
          this.setDataValue('codeConfig', val.join(';'));
        },
      },
      manager: Sequelize.STRING(),
      createAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("create");

  }
};
