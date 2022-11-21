'use strict';
const tableInfo = {
  tableName: 'bookings',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableInfo.tableName, 'birthday', {
        type: Sequelize.BIGINT,
        allowNull: false,
      }),
      queryInterface.addColumn(tableInfo.tableName, 'token', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all();
  },
};
