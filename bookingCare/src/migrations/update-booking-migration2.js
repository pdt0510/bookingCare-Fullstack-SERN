'use strict';
const tableInfo = {
  tableName: 'bookings',
};

//src25, v94xx2
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableInfo.tableName, 'birthday', {
        type: Sequelize.BIGINT,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all();
  },
};
