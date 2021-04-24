'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("branches", {
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
      createAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("create");
  }
};
